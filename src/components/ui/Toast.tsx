import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ThemeText } from './ThemeText'
import { ToastConfigParams } from 'toastify-react-native/utils/interfaces'
import { CheckMarkIcon } from './Icon'

export const NotificationToast = ({ text1 }: ToastConfigParams) => {
  return (
    <View style={styles.customToast}>
      <CheckMarkIcon />
      <ThemeText variant='label' weight='bold' color='text-white' align='center'>{text1}</ThemeText>
    </View>
  )
}

const styles = StyleSheet.create({
  customToast: {
    width: '60%',
    backgroundColor: '#1F1F1F',
    borderRadius: 8,
    padding: 16,
    gap: 8,
    alignItems: 'center',
    justifyContent: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})
