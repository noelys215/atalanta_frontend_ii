import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import paymentReducer from './slices/paymentSlice';
import orderReducer from './slices/orderSlice';
import orderPayReducer from './slices/orderPaySlice';
import orderHistoryReducer from './slices/orderHistorySlice';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// Combine all reducers
const rootReducer = combineReducers({
	cart: cartReducer,
	userInfo: userReducer,
	payment: paymentReducer,
	order: orderReducer,
	orderPay: orderPayReducer,
	orderHistory: orderHistoryReducer,
});

// Persist configuration
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['userInfo', 'payment'], // Persist only userInfo, you can add other slices if needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
	reducer: persistedReducer,
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore these action types
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				// Ignore paths that include non-serializable values
				ignoredPaths: ['register'],
			},
		}),
});

// Create a persistor to persist the store
export const persistor = persistStore(store);

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type
export type AppDispatch = typeof store.dispatch;
