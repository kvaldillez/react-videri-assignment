import React from 'react';

const Clouds = props => {
  console.log(props.match.params.folder);

  return (
    <div>
      <br />
      this is a cloud folder
    </div>
  );
};

export default Clouds;
