import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import Escaperegexp from 'escape-string-regexp';

class SearchBook extends Component{
    state = {
      query : ''
    }
    updateChange(quer){
      this.setState({
        query:quer.trim()
      })
      
    }
    render(){
        
        const{query} = this.state 
        const{books,onShelfChange}=this.props
        let showingContacts
        if(query)
        {
          const match = new RegExp(Escaperegexp(query),'i')
            showingContacts = books.filter((book)=>match.test(book.title))
        }
        else
        {
          showingContacts = books
        }
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link to='/'><button className="close-search">Close</button></Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input
                onChange = {(event)=>this.updateChange(event.target.value)}  
                type="text" 
                value={this.state.query}
                placeholder="Search by title or author"
                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {  showingContacts.filter((book)=>book.shelf === "none").map(
                       (book) => (
                        <li>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select onChange={(e)=>onShelfChange(book,e.target.value)} value={book.shelf}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading"  >Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors[0]}</div>
                        </div>
                      </li>
                       )
                    )}
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchBook