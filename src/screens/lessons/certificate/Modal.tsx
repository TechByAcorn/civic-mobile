import React, { useCallback, useState } from "react";
import { Image, Modal, Pressable, TouchableOpacity, View } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { Toast } from 'toastify-react-native';
 
import { useCertificateModalStore } from "./store";
import { ThemeText } from "@/components/ui/ThemeText";
import { DownloadAsImageIcon, DownloadAsPDFIcon, FullScreenIcon, InstagramIcon, LinkedInIcon, TiktokIcon, CloseIcon } from "@/components/ui/Icon";

interface CertificateModalProps {
  imageUrl?: string;
  pdfUrl?: string;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ imageUrl, pdfUrl }) => {
  const { visible, onToggle } = useCertificateModalStore();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingPdf, setIsSavingPdf] = useState(false);

  const ensureMediaPermission = useCallback(async () => {
    const current = await MediaLibrary.getPermissionsAsync();
    if (current.granted) return true;
    const req = await MediaLibrary.requestPermissionsAsync();
    return req.granted;
  }, []);

  const saveCertificateImage = useCallback(async () => {
    if (isSaving) return;
    try {
      setIsSaving(true);
      const granted = await ensureMediaPermission();
      if (!granted) {
        Toast.error('Photos permission is required to save');
        return;
      }
      if (imageUrl) {
        const extMatch = /\.([a-zA-Z0-9]+)(\?.*)?$/.exec(imageUrl);
        const ext = extMatch?.[1] || 'jpg';
        const target = `${FileSystem.cacheDirectory}certificate-${Date.now()}.${ext}`;
        const { uri } = await FileSystem.downloadAsync(imageUrl, target);
        await MediaLibrary.saveToLibraryAsync(uri);
      } else {
        const localModule = require("assets/images/certificate-placeholder.png");
        const asset = Asset.fromModule(localModule);
        await asset.downloadAsync();
        const uri = asset.localUri ?? asset.uri;
        if (!uri) throw new Error('Unable to resolve certificate image');
        await MediaLibrary.saveToLibraryAsync(uri);
      }
      Toast.success('Saved to Photos');
    } catch (e) {
      Toast.error('Failed to save image');
    } finally {
      setIsSaving(false);
    }
  }, [ensureMediaPermission, isSaving, imageUrl]);

  const saveCertificatePdf = useCallback(async () => {
    if (isSavingPdf) return;
    try {
      setIsSavingPdf(true);
      if (pdfUrl) {
        const fileName = `certificate-${Date.now()}.pdf`;
        const dest = `${FileSystem.documentDirectory}${fileName}`;
        const { uri } = await FileSystem.downloadAsync(pdfUrl, dest);
        if (!uri) throw new Error('Download failed');
        Toast.success('PDF saved');
      } else {
        const localModule = require("assets/images/certificate-placeholder.png");
        const asset = Asset.fromModule(localModule);
        await asset.downloadAsync();
        const srcUri = asset.localUri ?? asset.uri;
        if (!srcUri) throw new Error('Unable to resolve certificate image');
        const extMatch = /\.([a-zA-Z0-9]+)(\?.*)?$/.exec(srcUri);
        const ext = extMatch?.[1] || 'jpg';
        const dest = `${FileSystem.documentDirectory}certificate-${Date.now()}.${ext}`;
        await FileSystem.copyAsync({ from: srcUri, to: dest });
        Toast.success('Image saved to Files');
      }
    } catch (e) {
      Toast.error('Failed to save PDF');
    } finally {
      setIsSavingPdf(false);
    }
  }, [isSavingPdf, pdfUrl]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onToggle}>
      <View style={{ flex: 1 }} testID="categories-modal">
        {isFullScreen ? (
          <View style={{ flex: 1, backgroundColor: '#000' }}>
        
            <View style={{ flex: 1 }}>
              <Image
                source={imageUrl ? { uri: imageUrl } : require("assets/images/certificate-placeholder.png")}
                resizeMode="contain"
                style={{ width: '100%', height: '100%' }}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsFullScreen(false)}
              className="absolute top-20 left-5 w-[36] h-[36] items-center justify-center"
            >
              <CloseIcon color="#FFF" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flex: 1 }} className="justify-end">
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <Pressable style={{ flex: 1 }} onPress={onToggle} testID="course-rating-modal-backdrop" />
            </View>
            <View className="flex-[0.8] bg-neutralBackground rounded-t-[12] pt-section pb-6" testID="categories-modal-content">
              <ThemeText variant="subtitle" weight="bold" align="center">Your Certificate</ThemeText>
              <View className="mx-section mt-sectionLg">
                <Image
                  source={imageUrl ? { uri: imageUrl } : require("assets/images/certificate-placeholder.png")}
                  className="w-full h-[245]"
                  resizeMode="stretch"
                />
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setIsFullScreen(true)}
                  className="absolute bottom-[-8] left-1/2 -translate-x-1/2 w-auto px-[14] py-medium flex-row items-center justify-center gap-medium border border-disabled rounded-[12] bg-white"
                >
                  <FullScreenIcon />
                  <ThemeText variant="label" weight="medium">View Full Screen</ThemeText>
                </TouchableOpacity>
              </View>
              <View className="flex-1 mt-screen bg-white rounded-[8] p-section">
                <ThemeText variant="label" weight="bold" align="center">Share your certificate to</ThemeText>
                <View className="mt-container flex-row justify-center items-center gap-section">
                  <View className="gap-medium items-center px-tiny">
                    <TouchableOpacity activeOpacity={0.7} className="w-[52] h-[52] rounded-full border border-inputBorder items-center justify-center">
                      <TiktokIcon />
                    </TouchableOpacity>
                    <ThemeText variant="caption" color="text-secondary">Tiktok</ThemeText>
                  </View>
                  <View className="gap-medium items-center px-tiny">
                    <TouchableOpacity activeOpacity={0.7} className="w-[52] h-[52] rounded-full border border-inputBorder items-center justify-center">
                      <InstagramIcon />
                    </TouchableOpacity>
                    <ThemeText variant="caption" color="text-secondary">Instagram</ThemeText>
                  </View>
                  <View className="gap-medium items-center px-tiny">
                    <TouchableOpacity activeOpacity={0.7} className="w-[52] h-[52] rounded-full border border-inputBorder items-center justify-center">
                      <LinkedInIcon />
                    </TouchableOpacity>
                    <ThemeText variant="caption" color="text-secondary">Linkedin</ThemeText>
                  </View>
                </View>

                <View className="mt-section w-full h-[0.5] bg-border" />

                <View className="mt-section">
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={saveCertificateImage}
                    disabled={isSaving}
                    className="mb-container px-container flex-row items-center gap-container border border-inputBorder rounded-[12] h-[53]"
                  >
                    <DownloadAsImageIcon />
                    <ThemeText weight="medium">Download as image</ThemeText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={saveCertificatePdf}
                    disabled={isSavingPdf}
                    className="px-container flex-row items-center gap-container border border-inputBorder rounded-[12] h-[53]"
                  >
                    <DownloadAsPDFIcon />
                    <ThemeText weight="medium">Download as pdf</ThemeText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </Modal>
  )
}

export default CertificateModal
