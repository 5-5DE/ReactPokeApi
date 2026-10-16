import { useAudioPlayer } from "expo-audio";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";

export default function Index() {
  const [pokemon, setPokemon] = useState<{ name: string }[]>([]);
  

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=150&offset=0")
      .then((response) => response.json())
      .then((data) => setPokemon(data.results));
  }, []);
  var index = 0;
  const player = useAudioPlayer();

function reproducirSonido(id: number) {
  player.replace({
    uri: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`,
  });
  player.play();
}
  return (
    <FlatList
      data={pokemon}
      keyExtractor={(item) => item.name}
      renderItem={({ item, index: Index }) => 
      <View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Text>{item.name}</Text>
          <Button
            title="Sonido"
            onPress={() => reproducirSonido(Index + 1)}
          />
        </View>
        <Image source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Index + 1}.png` }} style={{ width: 72, height: 72 }} /> 
      </View>}
    />
  );
}
