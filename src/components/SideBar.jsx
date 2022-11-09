import React from 'react';
import PropTypes from 'prop-types';

class SideBar extends React.Component {
  render() {
    const { Id, name } = this.props;
    return (
      <aside>
        <button
          data-testid="category"
          name="category"
          type="button"
          id={ Id }
        >
          { name }
        </button>
      </aside>
    );
  }
}

export default SideBar;

SideBar.propTypes = { Id: PropTypes.string.isRequired };
SideBar.propTypes = { name: PropTypes.string.isRequired };
