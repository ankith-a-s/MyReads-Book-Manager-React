import React from 'react';
import * as BooksAPI from './BooksAPI';
import SearchBook from './SearchBook';
import './App.css';
import BookShelf from './BookShelf';
import { Route } from 'react-router-dom';
class BooksApp extends React.Component {
  constructor(props){
    super(props)
    this.updateShelf = this.updateShelf.bind(this)
    this.state = {
      books : []
    }
  }
  updateShelf(book,shelf){
    BooksAPI.update(book,shelf).then(response =>{
      book.shelf = shelf
      this.setState((current)=>({
        books:current.books.filter((boo)=>boo.id!==book.id).concat(book)
      }))
    })
  }
  componentDidMount(){
    
   BooksAPI.getAll().then((books)=>{
     this.setState({books})
   })
  }
  render() {
    
    return (
      <div className="app">
        <Route exact path = '/' render={()=>(<BookShelf
         books = {this.state.books}
         onShelfChange = {(book,shelf)=>this.updateShelf(book,shelf)}
        />)}/>
        <Route path = '/search' render={()=>(<SearchBook
         books = {this.state.books}
         onShelfChange = {this.updateShelf}
        />)}/>
      </div>
      
    )
  }
}

export default BooksApp
