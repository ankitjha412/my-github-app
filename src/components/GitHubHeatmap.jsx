import React from "react";
import GitHubCalendar from "react-github-calendar";

const GitHubHeatmap = ({ username }) => {
  if (!username) {
    return <p>Loading contributions...</p>;
  }

  return (
    <div>
      <h3>GitHub Contribution Heatmap</h3>
      <GitHubCalendar
        username={username}
        blockSize={12}      // Size of each contribution block
        blockMargin={4}     // Space between blocks
        colorScheme="dark"  // Use "light" for a white background
        fontSize={14}       // Size of text
      />
    </div>
  );
};

export default GitHubHeatmap;
