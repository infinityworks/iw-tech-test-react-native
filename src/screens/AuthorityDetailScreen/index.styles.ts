import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    title: {
        padding: 8,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    rating: {
        padding: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ratingText: {
        paddingLeft: 64,
        paddingRight: 64,
        fontSize: 21,
    },
    ratingTextHeader: {
        paddingLeft: 64,
        paddingRight: 64,
        fontSize: 21,
        fontWeight: 'bold',
    },
});

export { styles };
