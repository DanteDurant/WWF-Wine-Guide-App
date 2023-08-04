import * as Location from 'expo-location';
import { create } from 'zustand';

let initialised = false

export const useLocation = create((set, get:any) => ({
  location: null,
  permission: false,

  init: async () => {
    if (initialised)
      return
    // console.log('Location init')
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') return
    set({permission: true})    
    // console.log('Location success!')
    get().update()
    setInterval(() => get().update(), 5000)
    initialised = true
  },

  update: async () => {
    const location = await Location.getCurrentPositionAsync({})
    // const location:any = await Location.getLastKnownPositionAsync({})
    if (location) {
      set({location})
      // console.log('Location updated', location?.coords?.latitude, location?.coords?.longitude)
    }
  }
}));

(useLocation.getState() as any).init()