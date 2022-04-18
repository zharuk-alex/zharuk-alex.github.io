import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import gh_page from '@/gh_data.js'

Vue.use(Vuex)

const GITHUB_PAGES_URL = 'https://zzharuk.github.io';

export default new Vuex.Store({
  state: {
    projects: [],
    gh_pages: gh_page,
    project_filter_val: "all",
    project_search_val: "",
    sortby_value: "created",
    sort_direction: "desc",
    page_number: 2,
    page_items_limit: 9
  },
  getters: {
    projects:(state)=>state.projects,
    gh_pages:(state)=>state.gh_pages,
    sortby_value: (state)=>state.sortby_value,
    sort_direction: (state)=>state.sort_direction,
    page_number: (state)=>state.page_number,
    pageCount: (state, getters)=>{
      let size = Object.values(getters.filteredProjects).length;
      return Math.ceil(size/state.page_items_limit);  
    },
    paginatedProjects: (state, getters)=>{
      const start = (state.page_number-1) * state.page_items_limit,
            end = start + state.page_items_limit;
      return getters.filteredProjects.slice(start, end);
    },
    filteredProjects: (state)=>{      
      let gh_pages_filtered = (state.project_filter_val == "gh_p") ? state.projects.filter(p=>p.gh_pages) : state.projects
      let search_filtered = gh_pages_filtered.filter((prj) => 
          !state.project_search_val ||
          prj.name.toLowerCase().indexOf(state.project_search_val.toLowerCase()) > -1
      )
      let sortedBy = search_filtered.sort((prj_a, prj_b)=>{
        let condition;
        if(state.sortby_value == "created"){
          condition = state.sort_direction == 'asc' ? new Date(prj_a.created_at) - new Date(prj_b.created_at) : new Date(prj_b.created_at) - new Date(prj_a.created_at)
        } else if(state.sortby_value == "reponame") {
          let name_a = prj_a.name.toString().toUpperCase()
          let name_b = prj_b.name.toString().toUpperCase()
          if (name_a < name_b) {
            condition = state.sort_direction == 'asc' ? -1 : 1;
          } else if (name_a > name_b) {
            condition = state.sort_direction == 'asc' ? 1 : -1;
          } else {
            condition = 0;
          }
        }
        return condition
      })
      return sortedBy
    }
  },
  mutations: {
    SET_PROJECTS(state, projects){
      state.projects = projects
    },
    SET_GITHUB_PAGES(state, json){
      state.gh_pages = json
    },
    SET_PROJECT_FILTER_VAL(state, val){
      state.project_filter_val = val
    },
    SET_PROJECT_SEARCH_VAL(state, val){
      state.project_search_val = val
    },
    SET_PROJECT_SORT_VAL(state, val){
      state.sortby_value = val
    },
    SET_PROJECT_SORT_DIRECTION(state, val){
      state.sort_direction = val
    },
    SET_PROJECTS_PAGES(state,val){
      state.project_pages = val
    },
    SET_PAGINATION_PAGE_NUMBER(state, val){
      state.page_number = val
    }
  },
  actions: {
    async fetchGithubProjects({getters, commit}){
      return await axios
        .get("https://api.github.com/users/zzharuk/repos")
        .then(response => {
          commit('SET_PROJECTS', response.data)
          return response.data
        })
        .then((repos)=>{
          return repos.map(repo=>{
            getters.gh_pages.forEach(gh_page => {
              if(repo.name == gh_page.name){
                repo = {...repo, gh_pages: `${GITHUB_PAGES_URL}/${repo.name}/`}
              }
            })
            return repo;
          })
        }).then(repos=>{
          commit('SET_PROJECTS', repos)
        })
    }
  }
})
