import { create } from "zustand";
import backendURL from "../constants/backendURL";
import { filterOptions } from "../constants/FilterOptions";
import { distanceToVineyard, getOpenStatus } from "../util/util";
import AsyncStorage from "@react-native-async-storage/async-storage";
import packagedManifest from '../assets/data/manifest.json'

const baseUrl = backendURL
// const baseUrl = "http://192.168.100.20:3000";
const manifestUrl = `${baseUrl}/manifest.json`;
const mediaUrl = `${baseUrl}/media/`;

export const useDatabase = create((set, get: any) => ({
  data: null,

  vineyardFilter: [],
  searchTerm: "",
  sortByDistance: false,

  sortedVineyards: null,
  featuredVineyards: null,
  filteredVineyards: null,

  specials: null,
  homeScreen: null,
  specialsScreen: null,

  countByFilter: {},

  init: () => {
    // AsyncStorage.removeItem(manifestUrl)
    get().update();
    setInterval(() => get().update(), 60000);
  },

  update: async () => {
    // console.log("UPDATING DB")
    try {
      // const newData = await (await fetch(manifestUrl)).json()
      const newData = await fetchWithCache(manifestUrl)

      const homeScreen = newData.homeScreen
      for (const i in homeScreen.vineyards) {
        const id = homeScreen.vineyards[i]
        homeScreen.vineyards[i] = newData.vineyards.find((x:any) => x.id == id)
      }

      for (const i in homeScreen.specials) {
        const id = homeScreen.specials[i]
        homeScreen.specials[i] = newData.specials.find((x:any) => x.id == id)
      }
  
      const specialsScreen = newData.specialsScreen
      for (const i in specialsScreen.specials) {
        const id = specialsScreen.specials[i]
        specialsScreen.specials[i] = newData.specials.find((x:any) => x.id == id)
      }

      await get().updateUI(newData)
    } catch (e) {
      console.log("Data update failed!", e);
    }
  },

  filterVineyards: (sortedVineyards:any, filter:any) => {
    const filteredVineyards = sortedVineyards.filter((x:any) => {
      // const filter = get().vineyardFilter
      const terms = (get().searchTerm || '').trim().toLowerCase().split(' ')
      if (terms.length > 0) {
        for (const t of terms) {
          const searchIndex = (x.name + ' ' + x.location.address + ' ' + x.location.region).toLowerCase()
          if (searchIndex.indexOf(t) < 0)
            return false
        }
      }      
      if (filter.length == 0)
        return true
      for (const f of filter) {
        if ((f == 'OpenNow') && getOpenStatus(x).isOpen)
          return true
        if (x.badges.indexOf(f) < 0)
          return false
      }
      return true
    })
    return filteredVineyards
  },

  sortVineyards: (data:any) => {
    const vineyardsWithDistance = Object.values(data.vineyards).map((x:any) => ({...x, distance: distanceToVineyard(x)}))
    const sortedVineyards = get().sortByDistance
      ? vineyardsWithDistance.sort((a:any, b:any) => a.distance > b.distance ? 1 : -1)
      : vineyardsWithDistance.sort((a:any, b:any) => a.name > b.name ? 1 : -1)
    return sortedVineyards
  },

  getVineyardById: (id:any) => {
    return get().data.vineyards.find(x => x.id == id)
  },

  getSpecialById: (id:any) => {
    return get().data.specials.find(x => x.id == id)
  },

  updateUI: async (data:any = null) => {
    if (!data)
      data = get().data
    const sortedVineyards = get().sortVineyards(data)
    const featuredVineyards = sortedVineyards.filter((x:any) => x.isFeatured)
    console.log('filtering')
    const filteredVineyards = get().filterVineyards(sortedVineyards, get().vineyardFilter)
    console.log('filtering done')

    const countByFilter:any = {}
    for (const option of filterOptions)
      countByFilter[option.key] = 0

    Object.values(data.vineyards).forEach((vineyard:any) => {
      for (const option of filterOptions) {
        if (option.key == 'OpenNow') {
          countByFilter[option.key] += getOpenStatus(vineyard).isOpen ? 1 : 0
          // console.log('OS', vineyard.name, getOpenStatus(vineyard))
        }
        if (vineyard.badges.indexOf(option.key) >= 0)
          countByFilter[option.key]++
      }        
    })

    set({data, sortedVineyards, featuredVineyards, filteredVineyards, countByFilter, homeScreen: data.homeScreen, specialsScreen: data.specialsScreen})    
  },

  setSortByDistance: async (value:boolean) => {
    set({sortByDistance: value})
    await get().updateUI()
  },

  setSearchTerm: async (searchTerm:string) => {
    set({searchTerm})
    await get().updateUI()
  },

  setVineyardFilter: (newVineyardFilter:any) => {
    set({vineyardFilter: newVineyardFilter})
  },

  filter: () => {
  },

  set


}))

const state: any = useDatabase.getState();
state.init();


// const TTL = 24 * 60 * 60 * 1000; // 24 hours
const TTL = 15 * 60 * 1000
async function fetchWithCache(url:string) {
  try {
    const cachedData = await AsyncStorage.getItem(url);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const isExpired = Date.now() - timestamp > TTL;
      if (!isExpired) {
        // console.log("RETURNING CACHED")
        return data;
      }
    } else {
      // console.log("NO CACHED VERSION - FETCHING")
    }
    const response = await fetch(url);
    const data = await response.json();
    await AsyncStorage.setItem(url, JSON.stringify({ data, timestamp: Date.now() }));
    return data;
  } catch (error) {
    // console.log("ERROR FETCHING MANIFEST. RETURNING PACKAGED VERSION", error)
    const data = packagedManifest
    await AsyncStorage.setItem(url, JSON.stringify({ data, timestamp: Date.now() }));
    return data
    // console.error('Error fetching data:', error);
    // return null;
  }
}
