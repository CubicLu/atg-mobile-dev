import React from 'react';
import ChatBalloonComponent from './index';
import ReactDOM from 'react-dom';

let data = {
    isReply: true,
    message:
      'Your Message (Me) - is simply dummy text of the printing and typesetting industry.',
    date: new Date()
  }
describe('ChatPage render', () => {
  it("render without crash", async () => {
        const div = document.createElement('div');
        ReactDOM.render(<ChatBalloonComponent message={data.message} isReply={data.isReply} date={data.date} />, div);
        ReactDOM.unmountComponentAtNode(div);
  });
});
