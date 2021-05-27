async function loadPosts(limit, skip) {
    try {
        const results = await $.get(`/api/posts?limit=${limit}&skip=${skip}`)
        outputPosts(results, $(".postsContainer"))
    } catch (error) {
        console.log(error)
    }
}
 
loadPosts(10, 0).then(() => {
 
    const observer = new IntersectionObserver(infiniteScrolling)
 
    let lastPost = $(".post").last()[0]
 
    let count = 0
 
    observer.observe(lastPost)
 
    function infiniteScrolling(entries, observer) {
 
        entries.forEach((entry) => {
 
            if(entry.isIntersecting) {
 
                observer.unobserve(lastPost)
 
                loadPosts(10, $(".post").length)
                .then(() => {
 
                    const nextPageLastPost = $(".post").last()[0]
 
                    observer.observe(nextPageLastPost)
 
                    lastPost = nextPageLastPost
                        
                    count += 10
 
                    if($(".post").length - count < 10) {
                        observer.disconnect()
                        return
                    }
 
                }).catch(error => console.log(error))
 
            }
        })
    }
 
}).catch(error => console.log(error))
