import React from 'react';
import styled from 'styled-components';

/*
  BookmarkToggle
  - Styled checkbox toggle for bookmarking.
  - Props:
    - checked: boolean
    - onCheck: function (called when moving from unchecked -> checked)
  - Theme: recruiter amber (#F59E0B) with hover/active states.
*/
const BookmarkToggle = ({ checked = false, onCheck }) => {
  const handleChange = (e) => {
    // Only allow checking (no unbookmark flow provided)
    if (!checked && onCheck) onCheck();
    // Prevent unchecking in UI since API for unbookmark isn't defined
    e.target.checked = true;
  };

  return (
    <StyledWrapper aria-label="Bookmark candidate">
      <div>
        <input type="checkbox" id="bookmarkCheckbox" checked={checked} onChange={handleChange} />
        <label htmlFor="bookmarkCheckbox" className="bookmark" title={checked ? 'Bookmarked' : 'Bookmark'}>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" className="svgIcon" role="img" aria-hidden="true">
            <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14 4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
          </svg>
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .bookmark {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input[type='checkbox'] { display: none; }

  .svgIcon { height: 30px; }

  .svgIcon path { fill: rgb(153, 153, 153); transition: fill .2s ease; }

  .bookmark::before {
    content: "+";
    position: absolute;
    color: #ffffff;
    font-size: 1.2em;
    top: 1px;
  }

  input[type='checkbox']:checked + .bookmark::before {
    content: "\u2713";
    font-size: 0.70em;
    top: 5px;
  }

  /* Recruiter amber theme when checked */
  input[type='checkbox']:checked + .bookmark .svgIcon path { fill: #F59E0B; }

  .bookmark:active .svgIcon path { fill: #d1d5db; }

  .bookmark::after {
    content: "";
    background-color: rgba(245, 158, 11, 0.25); /* amber puff */
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    z-index: -1;
  }

  input[type='checkbox']:checked + .bookmark::after {
    animation: puff-out-center .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) both;
  }

  @keyframes puff-out-center {
    0% {
      transform: scale(1);
      filter: blur(0px);
      opacity: 1;
    }

    100% {
      transform: scale(9);
      filter: blur(1px);
      opacity: 0;
    }
  }
`;

export default BookmarkToggle;
