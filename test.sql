\c nc_games_test

-- SELECT reviews.owner, comments.review_id, reviews.created_at, reviews.votes, count(comments.review_id) as comment_count FROM comments
-- INNER JOIN reviews ON comments.review_id = reviews.review_id
-- GROUP BY reviews.owner, comments.review_id,reviews.created_at, reviews.votes;

-- SELECT reviews.owner, reviews.review_id, comments.body 
-- FROM reviews
-- JOIN comments ON reviews.review_id = comments.review_id;

-- SELECT reviews.owner, review_id FROM reviews;

-- SELECT reviews.*, COUNT (comments.review_id) AS comment_count 
-- FROM reviews 
-- LEFT JOIN comments ON comments.review_id = reviews.review_id
-- -- WHERE reviews.review_id = comments.review_id
-- GROUP BY reviews.review_id;

SELECT * FROM users WHERE username = 'mallionaire';