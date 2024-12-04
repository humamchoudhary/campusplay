import {
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Forward, MessageSquare, ThumbsUp } from "lucide-react-native";
import { router } from "expo-router";

function Post({ post }) {
  const colorScheme = useColorScheme();
  return (
    <ThemedView className="flex flex-col gap-4 w-full h-fit my-2">
      <ThemedView className="flex flex-row px-4 justify-between">
        <ThemedView className="flex flex-row gap-4 items-center">
          <ThemedView
            style={{ backgroundColor: Colors["light"].tint }}
            className="w-14 h-14 rounded-full"
          />
          <ThemedView className="flex flex-col justify-center">
            <ThemedText className="font-bold">{post.username}</ThemedText>
            <ThemedText
              className="font-extralight "
              style={{
                color: Colors[colorScheme ?? "light"].text + "80",
                fontSize: 12,
              }}
            >
              {post.time}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
      <ThemedText className="px-4" type="defaultSemiBold">
        {post.caption}
      </ThemedText>
      <ThemedView className="relative items-center justify-center">
        <Image
          src={post.image}
          resizeMode="contain"
          style={{
            width: "100%", // Full screen width
            height: undefined, // Automatically adjust height to maintain aspect ratio
            maxHeight: 360, // Limit the height to 360px
            aspectRatio: 16 / 9, // Optional: Maintain a specific aspect ratio
          }}
        />
        <ThemedView
          className="border rounded-lg absolute -bottom-5 shadow-md px-4 flex w-5/6 flex-row gap-2 justify-evenly items-center"
          style={{
            borderColor: Colors[colorScheme ?? "light"].tabIconDefault + "1A",
          }}
        >
          <ThemedView className="flex flex-row gap-3 items-center justify-center px-5 py-2">
            <ThumbsUp
              color={Colors[colorScheme ?? "light"].tabIconDefault}
              size={16}
            />
            <ThemedText
              style={{
                color: Colors[colorScheme ?? "light"].tabIconDefault,
                fontSize: 12,
              }}
            >
              {post.likes}
            </ThemedText>
          </ThemedView>

          <ThemedView className="flex flex-row gap-3 items-center justify-center px-5 py-2">
            <MessageSquare
              color={Colors[colorScheme ?? "light"].tabIconDefault}
              size={16}
            />
            <ThemedText
              style={{
                color: Colors[colorScheme ?? "light"].tabIconDefault,
                fontSize: 12,
              }}
            >
              {post.comments}
            </ThemedText>
          </ThemedView>

          <ThemedView className="flex flex-row gap-3 items-center justify-center px-5 py-2">
            <Forward
              color={Colors[colorScheme ?? "light"].tabIconDefault}
              size={16}
            />
            <ThemedText
              style={{
                color: Colors[colorScheme ?? "light"].tabIconDefault,
                fontSize: 12,
              }}
            >
              {post.shares}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

export default function HomeScreen() {
  const posts = [
    {
      username: "Abdullah Ijaz",
      caption: "Dummy Post",
      likes: 10,
      comments: 4,
      shares: 3,
      time: "1 day",
      image: "https://dummyimage.com/hd1080",
    },

    {
      username: "Abdullah Ijaz",
      caption: "Dummy Post",
      likes: 10,
      comments: 4,
      shares: 3,
      time: "1 day",
      image: "https://dummyimage.com/hd1080",
    },
    {
      username: "Abdullah Ijaz",
      caption: "Dummy Post",
      likes: 10,
      comments: 4,
      shares: 3,
      time: "1 day",
      image: "https://dummyimage.com/hd1080",
    },

    {
      username: "Abdullah Ijaz",
      caption: "Dummy Post",
      likes: 10,
      comments: 4,
      shares: 3,
      time: "1 day",
      image: "https://dummyimage.com/hd1080",
    },
    {
      username: "Abdullah Ijaz",
      caption: "Dummy Post",
      likes: 10,
      comments: 4,
      shares: 3,
      time: "1 day",
      image: "https://dummyimage.com/hd1080",
    },
  ];
  const paths = [
    { name: "Matches", path: "/matches", color: "red", bg: "#FF000080" },
    { name: "History", path: "history", color: "pink", bg: "#D0637CB3" },
  ];
  return (
    <ThemedView className="flex flex-col w-full h-full">
      <ScrollView
        horizontal={true}
        className="flex flex-row  my-2 px-4 w-full h-fit "
        contentContainerStyle={{ gap: 8 }}
      >
        {paths.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={() => {
                router.push(item.path);
              }}
              className="px-4 py-2 rounded-full h-fit"
              style={{ backgroundColor: item.bg }}
            >
              <ThemedText>{item.name}</ThemedText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <ScrollView className="flex flex-col h-full w-full py-4">
        <ThemedView className="flex flex-col h-full w-full gap-8 ">
          {posts.map((item, index) => (
            <Post key={index} post={item} />
          ))}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}
