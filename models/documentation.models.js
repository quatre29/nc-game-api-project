const documentation = {
  categories: {
    path: "GET /api/categories",
    description: "It will fetch all the categories",
  },

  reviews: {
    get_reviews: {
      path: "GET /api/reviews",
      description: "it will fetch all reviews",
    },
    get_review_by_id: {
      path: "GET /api/reviews/:review_id",
      description: "It will fetch any review with a valid id",
    },
    update_review: {
      path: "PATCH /api/reviews/:review_id",
      description:
        "Updates a review vote numbers (increment / decrement) - 1 / -1",
    },
  },

  comments: {
    get_comments_by_review: {
      path: "GET /api/reviews/:review_id/comments",
      description: "it will fetch all comments from a specific review",
    },
    post_comment_to_review: {
      path: "POST /api/reviews/:review_id/comments",
      description: "it will add a comment to a specific review",
    },
    delete_comment: {
      path: "DELETE /api/comments/:comment_id",
      description: "it will delete an existing comment",
    },

    update_comment: {
      path: "PATCH /api/comments/:comment_id",
      description: "it will update an existing comment",
    },
  },

  users: {
    get_users: {
      path: "GET /api/users",
      description: "it will fetch all the existing users",
    },

    get_user: {
      path: "GET /api/users/:username",
      description: "it will fetch an existing user",
    },
  },
};

module.exports = documentation;
