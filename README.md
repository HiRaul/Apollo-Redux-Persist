
## APOLLO-REDUX-PERSIST

This project is a PoC that has as the obejctive to validate the feasiblity of using Apollo with Redux and also persiste the cached data.

###How to start:
- run `yarn`
- run `cd ios && pod install && cd ..`
- Then finally run: `yarn start`

Once the app is running you can check things like refresh to see the images getting loaded faster due tha caching and also fully close the app and reopen it without internet. It should have all the data persisted.