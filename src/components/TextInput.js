import React from 'react'
import { View, Text, StyleSheet, TextInput as RNTextInput } from 'react-native'

const TextInput = ({
	innerRef,
	value,
	onChangeText,
	placeholder,
	maxLength,
	returnKeyType,
	onSubmitEditing,
	onEndEditing,
	errorMessage
}) => {
	return (
		<View style={styles.container}>
			<RNTextInput
				ref={innerRef}
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				style={styles.input}
				maxLength={maxLength}
				returnKeyType={returnKeyType}
				onSubmitEditing={onSubmitEditing}
				onEndEditing={onEndEditing}
			/>
			<Text style={styles.errMessage}>{errorMessage}</Text>
		</View>
	)
}

export default TextInput

const styles = StyleSheet.create({
	container: {
		marginBottom: 10,
	},
	input: {
		height: 44,
		padding: 10,
		backgroundColor: '#e8e8e8'
	},
	errMessage: {
		fontSize: 12,
		color: 'red',
	}
})
