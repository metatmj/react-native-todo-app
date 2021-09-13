import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, Alert } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux"
import { bindActionCreators } from 'redux'
import MemberItem from '../components/MemberItem'
import * as MemberAction from '../state/memberAction'
import color from '../colors'

const HomeScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const { deleteMember } = bindActionCreators(MemberAction, dispatch);
	const members = useSelector((state) => state.member);

	const onDeleteItem = (id, name) => Alert.alert(
		"Confirmation",
		`Are you sure to delete \n ${name}`,
		[
			{
				text: "Cancel",
				onPress: () => { },
				style: "cancel"
			},
			{ text: "OK", onPress: () => deleteMember(id) }
		]
	);

	const onEditItem = (member) => navigation.push('add', { member })

	const renderEmptyList = () => {
		return (
			<View style={styles.emptyContainer}>
				<TouchableOpacity onPress={() => navigation.push('add')} style={styles.addFirstButton}>
					<Text style={styles.addFirstButtonText}>Add your first member</Text>
				</TouchableOpacity>
			</View>
		)
	}

	const renderList = () => {
		return (
			<View>
				<FlatList
					data={members}
					keyExtractor={(item, index) => index.toString()}
					contentContainerStyle={{ flexGrow: 1 }}
					renderItem={({ item }) => <MemberItem
						onDeletePressed={() => onDeleteItem(item.id, item.name)}
						onEditPressed={() => onEditItem(item)}
						member={item}
					/>}
				/>
				{renderAddButton()}
			</View>
		)
	}

	const renderAddButton = () => {
		return (
			<TouchableOpacity onPress={() => navigation.push('add')} style={styles.addButton}>
				<Entypo name="plus" size={24} color={color.primary} />
				<Text>Add Member</Text>
			</TouchableOpacity>
		)
	}


	return (
		<View style={styles.container}>
			{members.length > 0 ? renderList() : renderEmptyList()}
		</View>
	)
}

export default HomeScreen


const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 8,
		paddingVertical: 12,
	},
	emptyContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: Dimensions.get('screen').width / 4
	},
	addFirstButton: {
		backgroundColor: color.primary,
		padding: 12,
		borderRadius: 4,
	},
	addFirstButtonText: {
		color: color.white
	},
	addButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 6,
		marginHorizontal: 12,
		marginVertical: 6,
		padding: 12,
		borderWidth: 1,
		borderColor: color.primary,
	},
})

