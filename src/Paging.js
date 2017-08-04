import React, { Component } from 'react'
import { StyleSheet, Text, View, BackHandler } from 'react-native'

const last = (list) => list[list.length-1]

export default class Paging extends Component {
   constructor(props) {
      super(props)
      const activePageKey = props.activePage || props.pages[0].key
      this.state = { stack: [props.pages.find(p => p.key === activePageKey )] }
   }

   componentWillMount = () => {
      BackHandler.addEventListener('backPress', () => {
         this.pop();
         return true;
      })
   }

   componentWillUnmount = () => {
      BackHandler.removeEventListener('backPress')
   }

   push = (key) => {
      const { state: { stack }, props: { pages } } = this
      this.setState({ stack: [ ...stack, pages.find(p => p.key === key) ] })
   }

   popTo = (key) => {
      const { stack } = this.state
      if (stack.length > 1) {
         if (key) {	
            let index = -1;
            let i = stack.length;
            while(i--) {
               if (stack[i].key === key) {
                  index = i;
                  break;
               }
            }
            if (index !== -1) {
               this.setState({ stack: stack.slice(0, index+1) })
            }
         }			
      }
   }

   pop = (key) => {
      const { stack } = this.state
      if (stack.length > 1) {
         this.setState({ stack: stack.slice(0, -1) })
      }
   }

   pushPage = (page) => {
      const { stack } = this.state
      this.setState({ stack: [ ...stack, page ] })
   }

   render() {
      const {
         props: { pages, body },
         state: { stack },
         push,
         pop,
         popTo,
         pushPage
      } = this;

      const activePage = last(stack)

      const Page = () => activePage.getData({ push, pop, popTo, pushPage })

      return (
         body({
            ...activePage,
            Page,
            push,
            pop,
            stack,
            popTo,
            pushPage
         })			
      )
   }
}