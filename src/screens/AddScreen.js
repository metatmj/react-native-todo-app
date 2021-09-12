import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import * as MemberAction from '../state/memberAction'
import TextInput from '../components/TextInput'
import color from '../colors';

const ERR_MESSAGE_NAME = 'Invalid name'
const ERR_MESSAGE_PHONE = 'Invalid phone number'
const ERR_MESSAGE_USER_ID = 'Invalid user id'

const AddScreen = ({ route, navigation }) => {
	const nameInput = useRef();
	const userIdInput = useRef();
	const phoneInput = useRef();

	const [name, setName] = useState('');
	const [userId, setUserId] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [isEditing, setIsEditing] = useState(false);

	const [isNameEdited, setIsNameEdited] = useState(false);
	const [isUserIdEdited, setIsUserIdEdited] = useState(false);
	const [isPhoneIdEdited, setIsPhoneIdEdited] = useState(false);

	const isNameValid = name.length > 0
	const isUserIdValid = userId.length == 17
	const isPhoneNumberValid = phoneNumber.length == 12

	const canSubmit = isNameValid && isUserIdValid && isPhoneNumberValid

	const dispatch = useDispatch();
	const { addMember, editMember } = bindActionCreators(MemberAction, dispatch);

	useEffect(() => {
		if (route.params) {
			navigation.setOptions({ title: 'Edit Member' });
			const { member } = route.params;
			setIsEditing(true);
			setName(member.name);
			setUserId(member.userId);
			setPhoneNumber(member.phoneNumber);
		} else {
			navigation.setOptions({ title: 'Add new member' });
		}
	}, [])

	const onAddMember = () => {
		addMember({ name, userId, phoneNumber });
		navigation.goBack();
	}

	const onEditMember = () => {
		const { member } = route.params
		editMember({ name, userId, phoneNumber, id: member.id });
		navigation.goBack();
	}

	const onUserIdEditing = (userIdText) => {
		let text = (userIdText).replace(/\D/g, '');
		if (text.length >= 2) text = text.slice(0, 1) + '-' + text.slice(1);
		if (text.length >= 7) text = text.slice(0, 6) + '-' + text.slice(6);
		if (text.length >= 13) text = text.slice(0, 12) + '-' + text.slice(12);
		if (text.length >= 16) text = text.slice(0, 15) + '-' + text.slice(15);
		setUserId(text)
	}

	const onPhoneEditing = (phoneText) => {
		let text = (phoneText).replace(/\D/g, '');
		if (text.length >= 4) text = text.slice(0, 3) + '-' + text.slice(3);
		if (text.length >= 8) text = text.slice(0, 7) + '-' + text.slice(7);
		setPhoneNumber(text)
	}

	return (
		<View style={styles.container}>
			<TextInput
				innerRef={nameInput}
				value={name}
				onChangeText={setName}
				placeholder={'NAME'}
				style={styles.input}
				returnKeyType='next'
				onSubmitEditing={() => userIdInput.current.focus()}
				onEndEditing={() => setIsNameEdited(true)}
				errorMessage={!isNameValid && isNameEdited ? ERR_MESSAGE_NAME : ''}
			/>
			<TextInput
				innerRef={userIdInput}
				value={userId}
				onChangeText={onUserIdEditing}
				placeholder={'ID'}
				maxLength={17}
				style={styles.input}
				returnKeyType='next'
				keyboardType='numeric'
				onSubmitEditing={() => phoneInput.current.focus()}
				onEndEditing={() => setIsUserIdEdited(true)}
				errorMessage={!isUserIdValid && isUserIdEdited ? ERR_MESSAGE_USER_ID : ''}
			/>
			<TextInput
				innerRef={phoneInput}
				value={phoneNumber}
				onChangeText={onPhoneEditing}
				placeholder={'PHONE NUMBER'}
				maxLength={12}
				style={styles.input}
				keyboardType='phone-pad'
				returnKeyType='done'
				onEndEditing={() => setIsPhoneIdEdited(true)}
				errorMessage={!isPhoneNumberValid && isPhoneIdEdited ? ERR_MESSAGE_PHONE : ''}
			/>
			<TouchableOpacity disabled={!canSubmit} onPress={isEditing ? onEditMember : onAddMember} style={styles.submitButton(!canSubmit)}>
				<Text style={styles.submitButtonText}>Submit</Text>
			</TouchableOpacity>
		</View>
	)
}

export default AddScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	input: {
		height: 44,
		padding: 10,
		marginBottom: 10,
		backgroundColor: '#e8e8e8'
	},
	submitButton: (disable) => {
		return {
			backgroundColor: disable ? color.gray : color.primary,
			padding: 12,
			borderRadius: 4,
			alignItems: 'center',
			justifyContent: 'center',
		}
	},
	submitButtonText: {
		color: color.white,
	},
})

