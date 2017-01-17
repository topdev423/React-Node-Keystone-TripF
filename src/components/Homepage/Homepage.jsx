import React, { PropTypes, Component }    from 'react';

const propTypes = {
  title: PropTypes.string
};

const defaultProps = {
  title: 'This is homepage of project HVU!'
};

class Homepage extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>
          <p>AAA....</p>
        </div>
      </div>
    );
  }
}

Homepage.propTypes = propTypes;
Homepage.defaultProps = defaultProps;

export default Homepage;
