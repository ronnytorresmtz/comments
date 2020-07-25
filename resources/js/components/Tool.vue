<template>
  <div>
    
    <div class="flex justify-between pb-4 border-b border-40">
      
      <h1 class="flex-no-shrink text-90 font-normal text-2xl">
        Comments 
        <span v-show="pagination.total !== undefined"> 
          ({{pagination.total}}) 
        </span>
      </h1>

      <button type="submit" class="btn btn-default btn-primary inline-flex items-center relative" 
          @click.prevent="saveComment">
          Save Comment
      </button>
      
    </div>

    <div class="card">
      <div class="card mb-6 py-3 px-6">

          <div class="flex justify-between">
            <h4 class="font-normal text-80">
              Write new comment
            </h4>
            <div>
              <label class="flex items-center select-none">
                  <input type="checkbox" class="checkbox mr-2" name=" Show Only My Comments" v-model="showOnlyMyComments" @click="applyShowOnlyMyComments()"> 
                  Show Only My Comments
              </label>
            </div>
          </div>

          <textarea id="commenter" v-model="comment" v-on:keyup.ctrl.13="saveComment"  dusk="commenter" rows="5" class="w-full form-control form-input form-input-bordered py-3 h-auto mt-2 mb-2 text-90"></textarea>

          <div class="help-text mb-2">
              On MacOS, press ⌘ + Enter, on Windows press Ctrl + Enter to save
          </div>

          <div class="mt-2" v-show="loading"> <loader class="pb-6 text-60"/> </div>
          
          <div v-for="comment in comments.data" :key="comment.id">
    
            <div class="commenter__comment py-4 border-t border-40">
    
              <div class="font-light text-80 text-sm">
                  <!-- <div> {{ comment.id}} </div> -->
                  <span v-if="(comment.userId === userId)">
                    <a :href="`/nova/resources/users/${userId}`" class="no-underline dim text-primary font-bold">
                      {{ comment.username }}  
                    </a>
                  </span>
                  <span v-else>
                    <span class="no-underline text-primary font-bold">
                      {{ comment.username }}  
                    </span>
                  </span>

                  <span class="mr-1"> said on {{ formatDate(comment.created_at) }} </span> 
                  <span class="mr-2 cursor-pointer" @click="deleteComment(comment.id)" v-show="(comment.userId === userId)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" aria-labelledby="delete" role="presentation" class="fill-current text-80"><path fill-rule="nonzero" d="M6 4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1a1 1 0 1 1 0-2h5zM4 6v12h12V6H4zm8-2V2H8v2h4zM8 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z"></path></svg>
                  </span>

              </div> 
    
              <div class="mt-2">
               {{ comment.text }}
              </div>
    
            </div>
    
          </div>
          

      </div>
        
        <nav class="flex justify-between items-center bg-20 rounded-b" v-show="showPagination()">
          <button :class="getClassForPreviusNext(pagination.prev_page_url)"
              @click="fetchPaginateComments(pagination.prev_page_url)"
              :disabled="!pagination.prev_page_url"
          >
              Previous
          </button>
          <span class="text-sm text-80 px-4"> {{pagination.from}}-{{pagination.to}} of {{pagination.total}}</span>
          <button :class="getClassForPreviusNext(pagination.next_page_url)"
              @click="fetchPaginateComments(pagination.next_page_url)"
              :disabled="!pagination.next_page_url"
          >
              Next
          </button>
        </nav>
    </div>

  </div>

    
</template>

<script>

export default {
  props: ['resourceName', 'resourceId', 'panel'],

  mounted() {
    this.initProperties();
    this.getComments();
   
  },

  data() {
    return {
      comment: '',
      userId: '',
      userName: '',
      comments: {},
      baseUrl: '/nova-vendor/comments/comments',
      url: '',
      pagination:[],
      per_page: '',
      showOnlyMyComments: '',
      loading: true,
    }
  },

  methods: {

    initProperties() {
      this.url = this.baseUrl;
      this.per_page = (this.panel.fields[0].per_page === undefined) 
                    ? this.per_page = 5 : this.per_page = this.panel.fields[0].per_page;
      this.userId = Nova.config.user.id;
      this.userName = Nova.config.user.name;
      this.userCompanyId = Nova.config.user.company_id || null ;
      this.showOnlyMyComments = false;
    },

    applyShowOnlyMyComments() {
      this.showOnlyMyComments = ! this.showOnlyMyComments;
      this.fetchPaginateComments(this.baseUrl);
    },

    fetchPaginateComments(url) {
      this.url = url;
      this.getComments();
    },

    getComments() {
      this.loading = true;
      axios.get(this.url, {
        params: {
          resourceName: this.resourceName,
          resourceId: this.resourceId,
          company_id: this.userCompanyId,
          per_page: this.per_page,
          showOnlyMyComments: this.showOnlyMyComments,
        }})
				.then(response => {
          this.comments = response.data;
          this.pagination = response.data;
          this.loading = false;
        })
        .catch((error) => {
          this.$toasted.show(error, { type: 'error' });
          this.loading = false;
        });
    },
    
    saveComment() {
      if (this.isEmpty(this.comment)) {
        this.$toasted.show('Write your comment before saving', { type: 'error' });
      } 
      else {
        this.loading = true;
        const comment = this.getComment();
        axios.post(this.baseUrl, comment)
          .then((response) => {
            this.resetComment();
            this.fetchPaginateComments(this.baseUrl);
            this.$toasted.show('Comment was added!', { type: 'success' });
          })
          .catch((error) => {
            this.$toasted.show(error, { type: 'error' });
          });
      }
    },

    getComment() {
      return { 
        resourceId: this.resourceId,
        resourceName: this.resourceName,
        company_id: this.userCompanyId,
        user_id: this.userId, 
        username: this.userName, 
        text: this.comment,
      };
    },

    deleteComment(id) {
      this.loading = true;
      axios.delete(`${this.baseUrl}/${id}`)
        .then((response) => {
          this.fetchPaginateComments(this.baseUrl);
          this.$toasted.show('Comment was deleted!', { type: 'success' });
        })
        .catch((error) => {
          this.$toasted.show(error, { type: 'error' });
        });
    },

    isEmpty(value) {
        return (value === undefined || value == null || value.length <= 0) ? true : false;
    },

    resetComment() {
      this.comment = '';
    },

    formatDate(created_at) {
      return moment(created_at).format('llll');
    },

    getClassForPreviusNext(value) {
      const textColor = (value) ? 'text-primary' : 'text-gray';
      return 'btn btn-link btn-border-none py-3 px-4 dim ' +  textColor;
    },

    showPagination() {
      if (this.pagination.total === undefined || this.pagination.total === 0) {
        return false;
      }

      return true;
    },

  },

}
</script>
