import React from 'react';
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { } from './../../components';
import { } from './../../actions';

interface Props extends RouteComponentProps {
 
}


class BlankPage extends React.Component<Props>{

  constructor(props: Props){ 
    super(props)
  }

  render(){
    return (
      <div></div>
    );
  }

}


const mapStateToProps = ({  }) => {
  return {  };
}
export default withRouter(connect(mapStateToProps, {

})(BlankPage));
