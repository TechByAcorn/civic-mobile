import React, { useState, useCallback, useEffect } from 'react';
import { View, FlatList, ListRenderItemInfo, Pressable, ActivityIndicator, Image } from 'react-native';
import { ThemeText } from '../../components/ui/ThemeText';
import ThemeInput from '../../components/ui/ThemeInput';
import { useNavigation } from '@react-navigation/native';
import { useSearch, SearchResult } from '../../services/search';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppBar from '../../components/ui/AppBar';
import { DurationIcon, RatingIcon, SlideShowIcon } from '@/components/ui/Icon';
import Svg, { Path, SvgProps } from 'react-native-svg';

// Search icon for input field
const SearchInputIcon = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M21 21L16.65 16.65M11 6C13.7614 6 16 8.23858 16 11M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
      stroke="#999"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Clear icon for input field
const ClearIcon = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M18 6L6 18M6 6L18 18"
      stroke="#999"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SearchResultCard: React.FC<{ item: SearchResult; onPress: (id: string) => void }> = ({
  item,
  onPress,
}) => {
  return (
    <Pressable
      accessibilityRole="button"
      testID={`search-result-${item.id}`}
      onPress={() => onPress(item.id)}
      className="py-4 border-b border-b-border"
    >
      <View className="flex-row items-center gap-[16]">
        <View className="flex-[0.6] gap-[4]">
          <View className="self-start bg-accentBackground px-[6] py-[2] rounded-full">
            <ThemeText variant="caption" weight="bold" color="text-secondary">
              {item?.category}
            </ThemeText>
          </View>
          <ThemeText variant="label" weight="bold" color="text-primary">
            {item.title}
          </ThemeText>
          <ThemeText variant="caption" color="text-secondary" numberOfLines={2}>
            {item.description || 'Learn more about this topic through engaging content.'}
          </ThemeText>
        </View>
        <View className="flex-[0.4]">
          <Image
            source={require('assets/images/course-demo-one.png')}
            className="w-full h-[80] rounded-[4]"
          />
          <View className="absolute top-[6] right-[6] flex-row items-center gap-[4] bg-white border border-border px-[4] py-[2] rounded-[4]">
            <RatingIcon />
            <ThemeText variant="caption" weight="medium">
              {typeof item.rating === 'number' ? item.rating.toFixed(1) : '4.7'}
            </ThemeText>
          </View>
        </View>
      </View>

      <View className="flex-row items-center gap-[16] mt-[16]">
        <View className="flex-row items-center gap-[8]">
          <DurationIcon />
          <ThemeText variant="caption" color="text-secondary">
            {item.duration || '30 - 45 Mins'}
          </ThemeText>
        </View>
        <View className="flex-row items-center gap-[8]">
          <SlideShowIcon />
          <ThemeText variant="caption" color="text-secondary">
            {typeof item.modules === 'number' ? `${item.modules} Modules` : '5 Modules'}
          </ThemeText>
        </View>
      </View>
    </Pressable>
  );
};

const EmptyState: React.FC<{ query: string }> = ({ query }) => (
  <View className="items-center justify-center px-screen py-section" testID="search-empty-state">
    <ThemeText variant="h4" weight="bold" color="text-primary" className="mb-2">
      No results found
    </ThemeText>
    <ThemeText variant="body" color="text-secondary" className="text-center">
      {query
        ? `We couldn't find any results for "${query}". Try searching with different keywords.`
        : 'Start typing to search for courses and content.'}
    </ThemeText>
  </View>
);

const SearchScreen: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query to avoid excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading, isError, refetch } = useSearch(debouncedQuery);

  const onCardPress = useCallback(
    (id: string) => {
      // Navigate to Course Details screen
      // @ts-ignore - Root navigator handles this route
      (navigation as any).navigate('Course-Details-Screen', { courseId: id });
    },
    [navigation]
  );

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <View className="flex-1 items-center justify-center" testID="search-loading">
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (isError) {
      return (
        <View className="flex-1 items-center justify-center px-screen" testID="search-error">
          <ThemeText variant="body" color="text-primary" className="mb-4">
            Failed to load search results.
          </ThemeText>
          <Pressable accessibilityRole="button" onPress={() => refetch()}>
            <ThemeText variant="label" weight="bold" color="text-primary">
              Retry
            </ThemeText>
          </Pressable>
        </View>
      );
    }

    if (!debouncedQuery.trim()) {
      return <EmptyState query={debouncedQuery} />;
    }

    if (data && data.length === 0) {
      return <EmptyState query={debouncedQuery} />;
    }

    return (
      <FlatList
        testID="search-results-list"
        data={data ?? []}
        keyExtractor={(item: SearchResult) => item.id}
        renderItem={({ item }: ListRenderItemInfo<SearchResult>) => (
          <SearchResultCard item={item} onPress={onCardPress} />
        )}
        removeClippedSubviews
        windowSize={5}
        maxToRenderPerBatch={10}
        contentContainerClassName="flex-grow px-screen pt-4"
      />
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: insets.top }} className="bg-white">
      <StatusBar style="dark" />
      <AppBar title="SEARCH" />

      <View className="px-screen pt-4 pb-2 bg-[#f8f8f8]">
        <ThemeInput
          testID="search-input"
          placeholder="Search for courses..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftComponent={<SearchInputIcon />}
          rightComponent={
            searchQuery ? (
              <Pressable onPress={handleClearSearch} testID="clear-search-button">
                <ClearIcon />
              </Pressable>
            ) : undefined
          }
          inputClassName="bg-white"
        />
      </View>

      <View className="flex-1 bg-[#f8f8f8]">{renderContent()}</View>
    </View>
  );
};

export default SearchScreen;
