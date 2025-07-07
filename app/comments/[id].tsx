import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { ArrowLeft, Heart, Send } from 'lucide-react-native';

interface Comment {
  id: string;
  userName: string;
  userImage: string;
  comment: string;
  timeAgo: string;
  likes: number;
  isLiked: boolean;
}

export default function CommentsScreen() {
  const { id } = useLocalSearchParams();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      userName: 'Maria Santos',
      userImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      comment: 'This looks amazing! I would love to work on a similar project.',
      timeAgo: '2h',
      likes: 12,
      isLiked: false,
    },
    {
      id: '2',
      userName: 'Carlos Rivera',
      userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      comment: 'Great design concept! The use of natural light is excellent.',
      timeAgo: '4h',
      likes: 8,
      isLiked: true,
    },
    {
      id: '3',
      userName: 'Anna Garcia',
      userImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=50&h=50&fit=crop&crop=face',
      comment: 'I have experience with similar renovations. Would love to discuss this project further.',
      timeAgo: '6h',
      likes: 15,
      isLiked: false,
    },
    {
      id: '4',
      userName: 'John Smith',
      userImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      comment: 'The budget range seems reasonable for this scope of work.',
      timeAgo: '8h',
      likes: 5,
      isLiked: false,
    },
    {
      id: '5',
      userName: 'Lisa Chen',
      userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      comment: 'I specialize in condo renovations in Taguig area. Let me know if you need any assistance!',
      timeAgo: '12h',
      likes: 20,
      isLiked: true,
    },
  ]);

  const handleBack = () => {
    router.back();
  };

  const handleLikeComment = (commentId: string) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment
      )
    );
  };

  const handleSendComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        userName: 'You',
        userImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
        comment: newComment.trim(),
        timeAgo: 'now',
        likes: 0,
        isLiked: false,
      };
      setComments(prevComments => [comment, ...prevComments]);
      setNewComment('');
    }
  };

  const renderComment = (comment: Comment) => (
    <View key={comment.id} style={styles.commentContainer}>
      <Image source={{ uri: comment.userImage }} style={styles.commentAvatar} />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentUserName}>{comment.userName}</Text>
          <Text style={styles.commentTime}>{comment.timeAgo}</Text>
        </View>
        <Text style={styles.commentText}>{comment.comment}</Text>
        <View style={styles.commentActions}>
          <TouchableOpacity 
            style={styles.likeButton}
            onPress={() => handleLikeComment(comment.id)}
          >
            <Heart 
              size={16} 
              color={comment.isLiked ? '#FF3B30' : colors.gray}
              fill={comment.isLiked ? '#FF3B30' : 'none'}
            />
            <Text style={[styles.likeCount, comment.isLiked && styles.likedCount]}>
              {comment.likes}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Comments</Text>
          <View style={styles.headerRight} />
        </View>
        
        <ScrollView style={styles.commentsContainer} contentContainerStyle={styles.commentsContent}>
          {comments.map(renderComment)}
        </ScrollView>
        
        <View style={styles.inputContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face' }}
            style={styles.inputAvatar}
          />
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Add a comment..."
              placeholderTextColor={colors.gray}
              multiline
            />
            <TouchableOpacity 
              style={[styles.sendButton, newComment.trim() && styles.sendButtonActive]}
              onPress={handleSendComment}
              disabled={!newComment.trim()}
            >
              <Send size={20} color={newComment.trim() ? colors.primary : colors.gray} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  headerRight: {
    width: 34,
  },
  commentsContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  commentsContent: {
    padding: 20,
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  commentUserName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black,
    marginRight: 8,
  },
  commentTime: {
    fontSize: 12,
    color: colors.gray,
  },
  commentText: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
    marginBottom: 8,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingRight: 12,
  },
  likeCount: {
    fontSize: 12,
    color: colors.gray,
    marginLeft: 6,
    fontWeight: '500',
  },
  likedCount: {
    color: '#FF3B30',
  },
  inputContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  inputAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    maxHeight: 100,
  },
  commentInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    minHeight: 24,
    marginRight: 8,
  },
  sendButton: {
    padding: 4,
  },
  sendButtonActive: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
  },
});