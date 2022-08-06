/*global axios */
/*global Vue */
var app = new Vue({
  el: '#app',
  data: {
    test: "Hello World",
    newComment: "",
    comments: [
      {title: 'Comment 1', upvotes:5},
      {title: 'Comment 2', upvotes:6},
      {title: 'Comment 3', upvotes:1},
      {title: 'Comment 4', upvotes:4},
      {title: 'Comment 5', upvotes:3},
    ],
  },
  created: function() {
    this.getall();
  },
  computed: {
    sortedComments() {
      return this.comments.sort((a, b) => {
        var rval = 0;
        if(a.upvotes > b.upvotes) {
          rval = -1;
        } else if(a.upvotes < b.upvotes) {
          rval = 1;
        }
        return(rval);
      })
    }
  },
  methods: {
    addComment() {
      var url = "/comments";
      axios.post(url, {
              title: this.newComment,
              upvotes: 0
          })
          .then(response => {
              console.log("Post Response ");
              console.log(response.data);
              this.comments.push(response.data);
          })
          .catch(e => {
              console.log(e);
          });
      console.log(this.comments);
      this.newComment = "";
    },
    async getall() {
        console.log("get all");
        var url = "/comments"; // This is the route we set up in index.js
        try {
            let response = await axios.get(url);
            this.comments = response.data; // Assign array to returned response
            console.log(this.comments);
            return true;
        }
        catch (error) {
            console.log(error);
        }
    },
    incrementUpvotes(item) {
        item.upvotes = item.upvotes+1;
        var url = "/comments/"+item._id+"/upvote";
        axios.put(url)
            .then(response => {
                console.log(response.data.upvotes);
                item.upvotes = response.data.upvotes;
            })
            .catch(e => {
                console.log(e);
            });
        console.log("URL "+url);
    }
  }
});

/*
var app = new Vue({
    el: '#app',
    data: {
        comments: [
            { title: 'Comment 1', upvotes: 5 },
            { title: 'Comment 2', upvotes: 6 },
            { title: 'Comment 3', upvotes: 1 },
            { title: 'Comment 4', upvotes: 4 },
            { title: 'Comment 5', upvotes: 3 }
        ],
        newComment: "",
    },
    created: function() {
      this.getall();
    },
    computed: {
        sortedComments() {
            return this.comments.sort((a, b) => {
                var rval = 0;
                if (a.upvotes > b.upvotes) {
                    rval = 1;
                }
                else if (a.upvotes < b.upvotes) {
                    rval = -1;
                }
                return (rval);
            })
        }

    },
    methods: {
        addComment() {
            this.comments.push({ title: this.newComment, upvotes: 0 });
            this.newComment = "";
        },
        incrementUpvotes(item){
            item.upvotes = item.upvotes+1;
        }
    }
});
*/
