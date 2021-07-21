const dummy = (blogs) => {

	return 1
}

const totalLikes = (blogs) => {
	if (blogs.length === 0) {
		return 0
	} else {
		var sum = 0;
		blogs.forEach(blog => {
			sum += blog.likes
		})

		return sum
	}
}

const favoriteBlog = (blogs) => {
	var highestLike = blogs[0].likes
	var favorite = blogs[0]
	blogs.forEach(blog => {
		if (blog.likes > highestLike) {
			favorite = blog
			highestLike = blog.likes
		}
	})

	return favorite
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}