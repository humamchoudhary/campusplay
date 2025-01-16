import {
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import {
  Ellipsis,
  Forward,
  ImageUp,
  Menu,
  MessageSquare,
  Send,
  ThumbsUp,
} from "lucide-react-native";

import { Menu as SMenu, Provider, Divider } from "react-native-paper";
import { router } from "expo-router";
import { useState } from "react";
import { useSession } from "@/context/SessionContext";

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
  const { user } = useSession();
  const colorScheme = useColorScheme();
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const { height, width } = Dimensions.get("window");

  const [editModal, setEditModal] = useState(false);
  const handleEdit = () => {
    closeMenu();
    // console.log("Edit clicked");
    setEditModal(true);
    // Add your edit logic here
  };
  const edit_form = useForm({
    defaultValues: {
      caption: caption,
      image: image,
    },
  });

  const handleDelete = () => {
    closeMenu();
    console.log("Delete clicked");
    // Add your delete logic here
  };
  return (
    <Provider>
      <ThemedView className="flex flex-col gap-4 w-full h-fit my-2">
        <ThemedView className="flex flex-row px-4 justify-between w-full">
          <ThemedView className="flex flex-row gap-4 items-center w-full">
            <ThemedView
              style={{ backgroundColor: Colors["light"].tint }}
              className="w-14 h-14 rounded-full"
            />
            <ThemedView
              className="flex flex-row justify-between items-center w-min"
              style={{ flex: 1 }}
            >
              <ThemedView className="flex flex-col justify-center">
                <ThemedText className="font-bold w-min">{username}</ThemedText>
                <ThemedText
                  className="font-extralight w-min"
                  style={{
                    color: Colors[colorScheme ?? "light"].text + "80",
                    fontSize: 12,
                  }}
                >
                  {time}
                </ThemedText>
              </ThemedView>
              {user && user.loggedin === "admin" ? (
                <SMenu
                  visible={visible}
                  onDismiss={closeMenu}
                  anchor={{
                    x: width,
                    y: 60,
                  }}
                  anchorPosition="top"
                  contentStyle={{
                    backgroundColor: Colors[colorScheme ?? "light"].background,
                    borderColor: Colors[colorScheme ?? "light"].background_sec,
                    borderWidth: 1,
                  }}
                >
                  <SMenu.Item onPress={handleEdit} title="Edit" />
                  <Divider />
                  <SMenu.Item onPress={handleDelete} title="Delete" />
                </SMenu>
              ) : null}

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={openMenu}
                style={{
                  padding: 3,
                }}
              >
                <Ellipsis color={Colors[colorScheme ?? "light"].text} />
              </TouchableOpacity>
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

      <Modal isVisible={editModal}>
        <ThemedView
          style={{
            backgroundColor: Colors[colorScheme ?? "light"].background,
            borderColor: Colors[colorScheme ?? "light"].tint,
            borderWidth: 1,
            width: "100%",
          }}
          className="flex flex-col rounded-md px-4 py-8 items-center gap-4"
        >
          <ThemedText style={{ fontWeight: 700, fontSize: 24 }}>
            Edit Post
          </ThemedText>
          <edit_form.Field
            name="caption"
            validators={{
              onSubmitAsync: ({ value }) => {
                return !value ? "Caption is required" : undefined;
              },
            }}
          >
            {(field) => (
              <TextInput
                className="border rounded-md w-full "
                placeholder="Coach Name"
                placeholderTextColor={
                  Colors[colorScheme ?? "light"].tabIconDefault
                }
                value={field.state.value}
                onChangeText={field.handleChange}
                style={{
                  borderColor:
                    field.state.meta.errors && field.state.meta.errors.length
                      ? "#F33"
                      : Colors[colorScheme ?? "light"].tabIconDefault + "80",
                  color:
                    field.state.meta.errors && field.state.meta.errors.length
                      ? "#F33"
                      : Colors[colorScheme ?? "light"].text,
                  paddingHorizontal: 10,
                  // paddingHorizontal: 10,
                  paddingVertical: 15,
                }}
              />
            )}
          </edit_form.Field>

          <edit_form.Field
            name="image"
            validators={{
              onSubmitAsync: ({ value }) => {
                return !value ? "Image is required" : undefined;
              },
            }}
          >
            {(field) => (
              <TouchableOpacity activeOpacity={0.9}>
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
              </TouchableOpacity>
            )}
          </edit_form.Field>

          <TouchableOpacity
            onPress={() => {
              setEditModal(false);
            }}
            activeOpacity={0.8}
            className="rounded-md w-full py-4 items-center"
            style={{ backgroundColor: "#d20f39" }}
          >
            <ThemedText>Cancel</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </Modal>
    </Provider>
  );
}

import Modal from "react-native-modal";
import { useForm } from "@tanstack/react-form";
export default function HomeScreen() {
  // INITIALIZATIONS
  const [newPostCaption, setNewPostCaption] = useState<string>();
  const colorScheme = useColorScheme();
  const { user } = useSession();
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

  // FUNCTIONS
  function addPost(newpost: Post) {
    // console.log(post.caption);
    setPosts((prev) => [newpost, ...prev]);
  }

  // FUNCTION FLOWS

  // RENDERS
  return (
    <ThemedView className="flex flex-col w-full h-full">
      <ScrollView className="flex flex-col h-full w-full py-4">
        {user && user.loggedin === "admin" && (
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
                placeholderTextColor={
                  Colors[colorScheme ?? "light"].text + "80"
                }
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
        )}
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
