#!/bin/sh
grep -rl "s.dependency 'React/Core'" node_modules/ | xargs sed -i '' 's=React/Core=React-Core=g'


# add these 2 lines to top of ios/Podfile
#  require_relative '../node_modules/react-native/scripts/react_native_pods'
#  require_relative '../node_modules/@react-native-community/cli-platform-ios/native_modules'

# add this just above "target: 'wwf-wine' do"
#   use_react_native! 

# in Podfile, change platform to ios 13