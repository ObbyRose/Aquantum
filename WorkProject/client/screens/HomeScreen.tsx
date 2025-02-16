// screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Props } from 'types/Types';

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [bitcoinPrice, setBitcoinPrice] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchBitcoinPrice = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://api.binance.com/api/v3/ticker/price', {
                params: { symbol: 'BTCUSDT' },
            });
            setBitcoinPrice(response.data.price);
        } catch (error) {
            console.error('Error fetching Bitcoin price', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const interval = setInterval(fetchBitcoinPrice, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://192.168.31.216:5000/api/users/logout');
            if (response.status === 200) {
                Alert.alert('Success', 'Logged out successfully!');
                navigation.replace('Login');
            }
        } catch (error) {
            console.error('Logout error:', error);
            Alert.alert('Error', 'Failed to log out. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Bitcoin Live Price</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                bitcoinPrice && Number(bitcoinPrice) !== 0 && (
                    <Text style={styles.price}>{"$" + Number(bitcoinPrice).toLocaleString()}</Text>
                )
            )}
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 32,
        marginVertical: 20,
    },
});

export default HomeScreen;
