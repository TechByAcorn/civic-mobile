import React, { useState } from "react";
import { View } from "react-native";
import { ThemeText } from "../ui/ThemeText";
import ThemeButton from "../ui/ThemeButton";
import { CourseScorePercentIcon, RatingIcon, SuccessIcon } from "../ui/Icon";
import StarRating from 'react-native-star-rating-widget';
import { useCertificateModalStore } from "@/screens/lessons/certificate/store";
import CourseRatingModal from "../lessons/CourseRatingModal";

const CompletedCard = () => {
  const [rating, setRating] = useState(0);
  const [ratingModal, setRatingModal] = useState(false);
  const { onToggle } = useCertificateModalStore();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const afterSubmitReview = (ratingCount: number) => {
    setIsSubmitted(true);
    console.log('ratingCount', ratingCount)
  }

  return (
    <View>
      <View className="p-container bg-white rounded-t-[8] pb-section">
        <View className="flex-row items-center gap-container mb-section">
          <CourseScorePercentIcon />
          <View className="flex-1">
            <ThemeText variant="label" color="text-secondary">Your Passing Score:</ThemeText>
            <ThemeText variant="h4" weight="bold">100%</ThemeText>
          </View>
        </View>
        <ThemeButton label="View Certificate" onPress={onToggle} />
      </View>
      <View className="px-container pt-container pb-section bg-neutralBackground rounded-b-[8]">
        {isSubmitted ? (
          <View className="items-center gap-item">
            <SuccessIcon width={48} height={48} />
            <ThemeText variant="label" weight="bold">Thank you for your feedbacks!</ThemeText>
            <ThemeText variant="caption" color="text-secondary">Success! You've successfully rated this course.</ThemeText>
          </View>
        ) : (
          <>
            <ThemeText variant="label" weight="bold">How would you recommend this course?</ThemeText>
            <View className="mt-container">
              <StarRating
                rating={rating}
                onChange={setRating}
                step="full"
                onRatingStart={() => setRatingModal(true)}
                StarIconComponent={() => <RatingIcon {...{ width: 36, height: 36, color: "#BFBFBF" }} />}
              />
            </View>
          </>
        )
        }

      </View >

      <CourseRatingModal
        visible={ratingModal}
        onClose={() => setRatingModal(false)}
        rating={rating}
        onChange={setRating}
        onSubmit={afterSubmitReview}
      />
    </View >
  )
}

export default CompletedCard;