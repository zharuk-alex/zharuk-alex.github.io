import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

function githubSecretAuthToken() {
  const token = process.env.VUE_APP_GIT_TOKEN
  return token ? {
    'Authorization': `token ${token}`
  } : {}
}

const GITHUB_PAGES_URL = 'https://zharuk-alex.github.io';

export default new Vuex.Store({
  state: {
    projects: [],
    project_filter_val: "all",
    project_search_val: "",
    sortby_value: "created",
    sort_direction: "desc",
    page_number: 1,
    projects_per_page: 9,
    repo_readme: "",
    repo_branch: "master",
    repo_branches: [],
  },
  getters: {
    projects: (state) => state.projects,
    sortby_value: (state) => state.sortby_value,
    sort_direction: (state) => state.sort_direction,
    page_number: (state) => state.page_number,
    pageCount: (state, getters) => {
      let size = Object.values(getters.filteredProjects).length;
      return Math.ceil(size / state.projects_per_page);
    },
    projectsPerPage: (state) => state.projects_per_page,
    getRepo: (state, getters) => id => getters.projects.find((repo) => repo.id == id),
    repoReadme: (state) => state.repo_readme,
    repoBranch: (state) => state.repo_branch,
    repoBranches: (state) => state.repo_branches,
    paginatedProjects: (state, getters) => {
      const start = (state.page_number - 1) * state.projects_per_page,
        end = start + state.projects_per_page;
      return getters.filteredProjects.slice(start, end);
    },
    filteredProjects: (state) => {
      let gh_pages_filtered = (state.project_filter_val == "gh_p") ? state.projects.filter(p => p.gh_pages) : state.projects
      let search_filtered = gh_pages_filtered.filter((prj) =>
        !state.project_search_val ||
        prj.name.toLowerCase().indexOf(state.project_search_val.toLowerCase()) > -1
      )
      let sortedBy = search_filtered.sort((prj_a, prj_b) => {
        let condition;
        if (state.sortby_value == "created" || state.sortby_value == "pushed") {
          let prop = state.sortby_value == "created" ? "created_at" : "pushed_at"
          condition = state.sort_direction == 'asc' ? new Date(prj_a[prop]) - new Date(prj_b[prop]) : new Date(prj_b[prop]) - new Date(prj_a[prop])
        } else if (state.sortby_value == "reponame") {
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
    SET_PROJECTS(state, projects) {
      state.projects = projects
    },
    SET_PROJECT_FILTER_VAL(state, val) {
      state.project_filter_val = val
    },
    SET_PROJECT_SEARCH_VAL(state, val) {
      state.project_search_val = val
    },
    SET_PROJECT_SORT_VAL(state, val) {
      state.sortby_value = val
    },
    SET_PROJECT_SORT_DIRECTION(state, val) {
      state.sort_direction = val
    },
    SET_PROJECTS_PAGES(state, val) {
      state.project_pages = val
    },
    SET_PAGINATION_PAGE_NUMBER(state, val) {
      state.page_number = val
    },
    SET_REPO_README(state, val) {
      state.repo_readme = val;
    },
    SET_REPO_BRANCH(state, val) {
      state.repo_branch = val;
    },
    SET_REPO_BRANCHES(state, val) {
      state.repo_branches = val;
    },
  },
  actions: {
    async fetchGithubProjects({ commit }) {
      return await axios
        .get("https://api.github.com/users/zharuk-alex/repos", {
          'headers': { ...githubSecretAuthToken() }
        })
        .then(response => {
          commit('SET_PROJECTS', response.data)
          return response.data
        })
        .then(repos => repos.map(repo => ({
          ...repo,
          gh_pages: repo.has_pages ? `${GITHUB_PAGES_URL}/${repo.name}/` : ""
        })
        )
        )
        .then(repos => {
          commit('SET_PROJECTS', repos)
        })
    },
    async fetchGithubReadme({ commit }, { repo, branch }) {
      return await axios
        .get(`https://raw.githubusercontent.com/zharuk-alex/${repo}/${branch}/README.md`)
        .then(response => {
          commit('SET_REPO_README', response.data)
          return response.data
        })
        .catch(error => {
          console.log(error)
          commit('SET_REPO_README', false)
        })
    },
    async fetchRepoBranches({ commit }, repo) {
      return await axios
        .get(`https://api.github.com/repos/zharuk-alex/${repo}/branches`, {
          'headers': { ...githubSecretAuthToken() }
        })
        .then(response => response.data)
        .then((r) => r.map(branch => ({ text: branch.name, value: branch.name })))
        .then(branches => {
          commit('SET_REPO_BRANCHES', branches);
          commit('SET_REPO_BRANCH', branches[0].value);
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})
