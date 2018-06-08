import {Meteor} from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import {mount} from 'enzyme'

import {PrivateHeader} from './PrivateHeader'

if (Meteor.isClient) {

  describe('PrivateHeader', function(){

    describe('Rendered Component',function(){

      it('should set button text to LogOut', function(){
        const wrapper = mount(<PrivateHeader title="Test Title" handleLogout={() => {}}/>)
        const buttonText = wrapper.find('button').text()

        expect(buttonText).toBe('LogOut')

      })

      it('should use title prop as h1 text', function(){
        const title='Test Title Here'
        const wrapper = mount(<PrivateHeader title={title} handleLogout={() => {}}/>)
        const h1Text = wrapper.find('h1').text()

        expect(h1Text).toBe(title)
      })
        
    })

    describe('User Interaction', function () {
            
      it('should call handleLogout on click', function() {
        const spy = expect.createSpy()
        const wrapper = mount(<PrivateHeader title="Test Title" handleLogout={()=>spy()}/>)

        wrapper.find('button').simulate('click')

        expect(spy).toHaveBeenCalled()

      })

    })
  })

}