import React from "react";
import { ThemeText } from "@/components/ui/ThemeText";
import { Image, Pressable, ScrollView, View } from "react-native";

type Card = {
  id: number;
  key: string;
  image: any;
  revealed: boolean;
  matched: boolean;
};

const images = [
  require("assets/images/course-demo-one.png"),
  require("assets/images/course-demo-two.png"),
  require("assets/images/illustration-one.png"),
  require("assets/images/illustration-two.png"),
];

const placeholder = require("assets/images/memory-game-placeholder.png");

const H5PMemoryGame: React.FC = () => {
  const buildDeck = React.useCallback((): Card[] => {
    const pairs = images.slice(0, 4).map((img, idx) => ({ key: `k${idx}`, image: img }));
    const deck: Card[] = pairs
      .flatMap((p) => [
        { id: Math.random(), key: p.key, image: p.image, revealed: false, matched: false },
        { id: Math.random(), key: p.key, image: p.image, revealed: false, matched: false },
      ])
      .sort(() => Math.random() - 0.5);
    return deck;
  }, []);

  const [cards, setCards] = React.useState<Card[]>(buildDeck());
  const [selected, setSelected] = React.useState<number[]>([]);
  const flipBackTimer = React.useRef<null>(null);

  const onPressCard = (id: number) => {
    setCards((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx === -1) return prev;
      const card = prev[idx];
      if (card.revealed || card.matched) return prev;
      const next = [...prev];
      next[idx] = { ...card, revealed: true };
      return next;
    });
    setSelected((prevSel) => {
      const nextSel = [...prevSel, id];
      if (nextSel.length === 2) {
        const [a, b] = nextSel;
        const ca = cards.find((c) => c.id === a);
        const cb = cards.find((c) => c.id === b);
        if (ca && cb && ca.key === cb.key && ca.id !== cb.id) {
          setCards((prev) => prev.map((c) => (c.id === a || c.id === b ? { ...c, matched: true } : c)));
          setTimeout(() => {
            setCards((prev) => prev.map((c) => (c.id === a || c.id === b ? { ...c, revealed: false } : c)));
          }, 10);
          return [];
        }
        if (flipBackTimer.current) clearTimeout(flipBackTimer.current);
        flipBackTimer.current = setTimeout(() => {
          setCards((prev) => prev.map((c) => (c.id === a || c.id === b ? { ...c, revealed: false } : c)));
          setSelected([]);
        }, 1000);
      }
      return nextSel.length === 2 ? nextSel : nextSel;
    });
  };

  const reset = () => {
    if (flipBackTimer.current) clearTimeout(flipBackTimer.current);
    setCards(buildDeck());
    setSelected([]);
  };

  return (
    <View className="flex-1 bg-white p-section">
      <ThemeText variant="h4">Memory Game</ThemeText>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-sectionLg"
      >
        <View className="mt-container flex-row flex-wrap justify-between">
          {cards.map((card) => {
            const showFront = card.revealed || card.matched;
            return (
              <Pressable
                key={card.id}
                className="w-[48%] mb-item"
                accessibilityRole="button"
                onPress={() => onPressCard(card.id)}
                disabled={card.matched}
              >
                <View className={`
                rounded-[12] overflow-hidden h-[140] bg-neutral 
                ${showFront ? 'p-[5] bg-positiveBackground' : ''}
                ${card.matched ? 'bg-[#EEEAE0]' : ''}`
                }>
                  <Image
                    source={showFront ? card.image : placeholder}
                    className={`w-full h-full ${showFront ? 'rounded-[8.6]' : ''}`}
                    resizeMode="cover"
                  />
                  {card.matched ? (
                    <View className="absolute inset-0 bg-[#EEEAE0] opacity-60" />
                  ) : null}
                </View>
              </Pressable>
            );
          })}
        </View>

        <View className="mt-section">
          <Pressable accessibilityRole="button" className="bg-brandPrimary px-container py-item rounded-[9] items-center" onPress={reset}>
            <ThemeText variant="label" color="text-white">Reset</ThemeText>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

export default H5PMemoryGame;
