<h1 align="center"><img src="https://github.com/jaredmeier/permanote/blob/master/app/assets/images/permanote-inline.png?raw=true" width="300" height="auto"></h1>

[Permanote](https://permanote-app.herokuapp.com/) is a note-taking app that features a rich-text editor, search, autosaving, and organization with notebooks and tags. Permanote is an [Evernote](https://evernote.com/) clone.

[Try Permanote](https://permanote-app.herokuapp.com/)

---

## Technologies

#### Rails, React & Redux
Permanote is built on a Rails backend with React and Redux for the frontend. It's structured as a normalized Redux state and uses thunks for async CRUD actions. 

#### ReactQuill
Permanote's rich-text editor is built with [ReactQuill](https://github.com/zenoamaro/react-quill). Customization of the ReactQuill editor includes a **custom toolbar that dynamically shows/hides**, minor styling changes on its Snow theme, and **note autosaving**. Autosaving uses a simple [debounce](https://www.npmjs.com/package/debounce) function. 

## Features

#### Notebooks
![](https://user-images.githubusercontent.com/11576738/79582511-d62f5800-8099-11ea-99f0-de8b36e11d4d.gif)

Users can create notebooks to organize notes. They can also delete and rename notebooks -- the renaming dialog will only allow the user to continue if the name is changed. When selecting a notebook, the most recently updated note is automatically loaded in the editor.

#### Search
![](https://user-images.githubusercontent.com/11576738/84102174-b18e9700-a9dd-11ea-89a6-0d987923ed85.gif)

Users can search all notes and notebooks using the search bar. When the user begins to type, live results showing matching note titles and notebook names appear in a dropdown. The user can then click "Search all notes" to search the content of all the notes and display matching results in the sidebar.


#### Tags

Users can also add any number of custom tags to notes. Notes can be filtered by specific tags, adding another layer of search and organization.

When tagging notes, users can either create a new tag or start typing to search existing tags and automatically populate a dropdown with search results.

```javascript
searchTags(tagSearch) {
        const tags = this.props.allTags.filter(tag => {
            return tag.name.toLowerCase().indexOf(tagSearch.toLowerCase()) !== -1;
        });
        
        tags.length ? this.setState({ tagSearchDropdown: true, tagSearchMatches: tags }) : this.setState({ tagSearchDropdown: false });
    }
```

## In-progress tasks, planned features & known issues

[See Permanote project board](https://github.com/jaredmeier/permanote/projects/1)
