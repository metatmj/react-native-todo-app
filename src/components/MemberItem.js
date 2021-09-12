import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import color from '../colors'

const MemberItem = ({ onDeletePressed, onEditPressed, member }) => {
	const { name, userId, phoneNumber } = member
	return (
		<View style={styles.container}>
			<View style={styles.wrapContent}>
				<Text style={styles.title}>{name}</Text>
				<Text style={styles.label}>{userId}</Text>
				<Text style={styles.label}>{phoneNumber}</Text>
			</View>
			<View style={styles.wrapIcon}>
				<TouchableOpacity onPress={onEditPressed}>
					<AntDesign name="edit" size={24} color="white" />
				</TouchableOpacity>
				<TouchableOpacity onPress={onDeletePressed}>
					<AntDesign name="delete" size={24} color="red" />
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default MemberItem

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 12,
		marginHorizontal: 12,
		marginVertical: 6,
		backgroundColor: color.primary,
		borderRadius: 4
	},
	wrapContent: {
		flex: 1
	},
	wrapIcon: {
		justifyContent: 'space-between'
	},
	title: {
		color: color.white,
		fontSize: 18,
		fontWeight: 'bold'
	},
	label: {
		color: color.white,
		marginTop:4,
	}
})

