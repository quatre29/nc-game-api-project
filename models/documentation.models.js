const documentation = {
  categories: {
    path: "GET /api/categories",
    description: "It will fetch all the categories",
    example_response: {
      categories: [
        {
          slug: "strategy",
          description:
            "Strategy-focused board games that prioritise limited-randomness",
        },
      ],
    },
  },

  reviews: {
    get_reviews: {
      path: "GET /api/reviews",
      description: "it will fetch all reviews",
      example_response: {
        reviews: [
          {
            review_id: 14,
            title: "Velit tempor ullamco amet ipsum dolor voluptate.",
            designer: "Don Keigh",
            review_body:
              "Nostrud anim cupidatat incididunt officia cupidatat magna. Cillum commodo voluptate laboris id ",
            review_img_url:
              "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
            votes: 3,
            category: "hidden-roles",
            owner: "cooljmessy",
            created_at: "2021-02-05T11:27:26.563Z",
            comment_count: "0",
          },
        ],
      },
    },
    get_review_by_id: {
      path: "GET /api/reviews/:review_id",
      description: "It will fetch any review with a valid id",
      example_response: {
        review: {
          review_id: 3,
          title: "Karma Karma Chameleon",
          designer: "Rikki Tahta",
          review_body:
            "Try to trick your friends. If you find yourself being dealt the Chamelean card then the aim of the game is simple; blend in...",
          review_img_url:
            "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          votes: 5,
          category: "hidden-roles",
          owner: "happyamy2016",
          created_at: "2021-01-18T10:01:42.151Z",
          comment_count: "5",
        },
      },
    },
    vote_review: {
      path: "PATCH /api/reviews/:review_id/vote",
      description:
        "Updates a review vote numbers (increment / decrement) - 1 / -1",
      example_body: { inc_votes: 1 },
    },
  },

  comments: {
    get_comments_by_review: {
      path: "GET /api/reviews/:review_id/comments",
      description: "it will fetch all comments from a specific review",
      example_response: {
        comments: [
          {
            comment_id: 19,
            author: "jessjelly",
            review_id: 3,
            votes: 3,
            created_at: "2021-03-27T19:48:58.110Z",
            body: "Quis duis mollit ad enim deserunt.",
          },
          {
            comment_id: 20,
            author: "cooljmessy",
            review_id: 3,
            votes: 17,
            created_at: "2021-03-27T14:15:38.110Z",
            body: "Laboris nostrud ea ex occaecat aute quis consectetur anim.",
          },
        ],
      },
    },
    post_comment_to_review: {
      path: "POST /api/reviews/:review_id/comments",
      description: "it will add a comment to a specific review",
      example_body: {
        comment: {
          username: "rocky299",
          body: "this is a comment",
        },
      },
    },
    delete_comment: {
      path: "DELETE /api/comments/:comment_id",
      description: "it will delete an existing comment",
    },

    vote_comment: {
      path: "PATCH /api/comments/:comment_id/vote",
      description: "you can vote for comment increment/ decrement",
      example_body: { inc_votes: -1 },
    },
  },

  users: {
    get_users: {
      path: "GET /api/users",
      description: "it will fetch all the existing users",
      example_response: {
        users: [
          {
            username: "tickle122",
          },
          {
            username: "grumpy19",
          },
          {
            username: "happyamy2016",
          },
          {
            username: "cooljmessy",
          },
        ],
      },
    },

    get_user: {
      path: "GET /api/users/:username",
      description: "it will fetch an existing user",
      example_response: {
        user: {
          username: "cooljmessy",
          avatar_url:
            "https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?cb=20170730171002",
          name: "Peter Messy",
        },
      },
    },
  },
};

module.exports = documentation;
