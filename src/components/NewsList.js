import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  Image,
  StyleSheet,
} from "react-native";

export default function NewsList({ articles = [] }) {
  if (!articles.length)
    return <Text style={styles.noNews}>No news to show.</Text>;

  return (
    <FlatList
      data={articles}
      keyExtractor={(item, idx) => item.url + idx}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.row}
          onPress={() => Linking.openURL(item.url)}
        >
          {item.urlToImage && (
            <Image source={{ uri: item.urlToImage }} style={styles.thumbnail} />
          )}
          <View style={styles.textContainer}>
            <Text numberOfLines={2} style={styles.title}>
              {item.title}
            </Text>
            <Text numberOfLines={3} style={styles.desc}>
              {item.description}
            </Text>
            <Text numberOfLines={1} style={styles.source}>
              {item.source?.name}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  thumbnail: { width: 80, height: 80, borderRadius: 8, marginRight: 12 },
  textContainer: { flex: 1 },
  title: { fontWeight: "700", fontSize: 16 },
  desc: { marginTop: 6, color: "#444", fontSize: 14 },
  source: { marginTop: 6, fontSize: 12, color: "#666" },
  noNews: { textAlign: "center", color: "#888", marginTop: 20 },
});
