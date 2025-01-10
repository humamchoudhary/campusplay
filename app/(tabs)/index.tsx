import {
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import {
  Forward,
  ImageUp,
  MessageSquare,
  Send,
  ThumbsUp,
} from "lucide-react-native";
import { router } from "expo-router";
import { useState } from "react";

interface Post {
  username: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  time: string;
  image: string;
}

function Post({
  username,
  caption,
  likes,
  comments,
  shares,
  time,
  image,
}: Post) {
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
            <ThemedText className="font-bold">{username}</ThemedText>
            <ThemedText
              className="font-extralight "
              style={{
                color: Colors[colorScheme ?? "light"].text + "80",
                fontSize: 12,
              }}
            >
              {time}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
      <ThemedText className="px-4" type="defaultSemiBold">
        {caption}
      </ThemedText>
      <ThemedView className="relative items-center justify-center">
        <Image
          src={image}
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
              {likes}
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
              {comments}
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
              {shares}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

export default function HomeScreen() {
  // INITIALIZATIONS
  const [newPostCaption, setNewPostCaption] = useState<string>();
  const colorScheme = useColorScheme();
  const [posts, setPosts] = useState([
    {
      username: "Abdullah Ijaz",
      caption: "Dummy Post",
      likes: 10,
      comments: 4,
      shares: 3,
      time: "1 day",
      image: "https://dummyimage.com/hd1080",
    },
  ]);
  const paths = [
    { name: "Matches", path: "/matches", color: "red", bg: "#FF000080" },
    { name: "History", path: "/history", color: "pink", bg: "#D0637CB3" },
    { name: "Top Performers", path: "/topperformers", color: "pink", bg: "#D0637CB3" },
    { name: "Rules", path: "/rules", color: "pink", bg: "#D0637CB3" },
  ];

  // FUNCTIONS
  function addPost(newpost: Post) {
    // console.log(post.caption);
    setPosts((prev) => [newpost, ...prev]);
  }

  // FUNCTION FLOWS

  // RENDERS
  return (
    <ThemedView className="flex flex-col w-full h-full">
      <ScrollView
        horizontal={true}
        className="flex flex-row  py-2 px-4 w-full h-fit border-b "
        style={{
          borderColor: Colors[colorScheme ?? "light"].tabIconDefault + "80",
        }}
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
        <ThemedView
          style={{
            borderColor: Colors[colorScheme ?? "light"].tabIconDefault + "33",
            flex: 1,
          }}
          className="border-b  flex-row gap-4 justify-between px-4 pb-4 mb-2"
        >
          <ThemedView
            className="rounded-full max-w-12 h-12 "
            style={{
              flex: 1,
              backgroundColor: Colors["light"].tint,
            }}
          />

          <ThemedView
            style={{
              backgroundColor:
                Colors[colorScheme ?? "light"].tabIconDefault + "33",
              // width: "70%",
              flex: newPostCaption ? 2 : 3,
            }}
            className="flex flex-row rounded-md h-min px-3 gap-2"
          >
            <TextInput
              // value="12"
              value={newPostCaption}
              onChangeText={(value) => {
                setNewPostCaption(value);
              }}
              placeholder="Add a post"
              placeholderTextColor={Colors[colorScheme ?? "light"].text + "80"}
              className="p-0 "
              style={{
                width: "100%",
                flex: newPostCaption ? 2 : 4,
                fontSize: 14,
                color: Colors[colorScheme ?? "light"].text,
              }}
            />
          </ThemedView>
          <ThemedView
            className="rounded-full max-w-12 h-12  flex items-center justify-center"
            style={{
              flex: 1,
              backgroundColor:
                Colors[colorScheme ?? "light"].tabIconDefault + "33",
            }}
          >
            <ImageUp
              color={Colors[colorScheme ?? "light"].text}
              className=""
              size={24}
            />
          </ThemedView>

          {newPostCaption && (
            <TouchableOpacity
              onPress={() => {
                const newPost: Post = {
                  caption: newPostCaption,
                  image: "https://dummyimage.com/hd1080",
                  likes: 0,
                  comments: 0,
                  shares: 0,
                  username: "Abdullah Ijaz",
                  time: "now",
                };
                addPost(newPost);
              }}
              className="rounded-full max-w-12 h-12  flex items-center justify-center"
              style={{
                flex: 1,
                backgroundColor:
                  Colors[colorScheme ?? "light"].tabIconDefault + "33",
              }}
            >
              <Send
                color={Colors[colorScheme ?? "light"].text}
                className=""
                size={24}
              />
            </TouchableOpacity>
          )}
        </ThemedView>

        <ThemedView
          className="flex flex-col h-full w-full gap-8 mb-40"
          style={{
            flex: 1,
          }}
        >
          {posts.map((item, index) => (
            <Post key={index} {...item} />
          ))}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}
