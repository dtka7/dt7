document.addEventListener('DOMContentLoaded', function () {
    const blogForm = document.getElementById('blog-form');
    const blogSection = document.getElementById('blog-posts');

    blogForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get content from the form
        const content = document.getElementById('post-content').value;

        // Create a new blog post element
        const postElement = document.createElement('article');

        // Format the current date in the desired format
        const currentDate = new Date();
        const day = currentDate.getDate();
        const formattedDate = currentDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });

        // Add ordinal indicator to the day (1st, 2nd, 3rd, 4th, etc.)
        const dayWithOrdinal = getDayWithOrdinal(day);

        const formattedTime = formatTime(currentDate);

        // Create title element with formatted timestamp using <em> tag
        const titleElement = document.createElement('h2');
        titleElement.innerHTML = `<em>${formattedDate.replace(String(day), dayWithOrdinal)}, ${formattedTime}</em>`;

        // Add the title to the post
        postElement.appendChild(titleElement);

        // Create content element
        const contentElement = document.createElement('p');
        contentElement.textContent = content;

        // Add the content to the post
        postElement.appendChild(contentElement);

        // Add the new blog post to the section
        blogSection.appendChild(postElement);

        // Clear the form field
        document.getElementById('post-content').value = '';
    });
});

// Function to get the day with ordinal indicator
function getDayWithOrdinal(day) {
    if (day >= 11 && day <= 13) {
        return day + 'th';
    }

    switch (day % 10) {
        case 1:
            return day + 'st';
        case 2:
            return day + 'nd';
        case 3:
            return day + 'rd';
        default:
            return day + 'th';
    }
}

// Function to format time and ensure lowercase am/pm
function formatTime(date) {
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true, // Use 12-hour format
        hourCycle: 'h23', // Ensure lowercase am/pm
    });
	// Convert am/pm to lowercase
    return formattedTime.toLowerCase();

    // Manually concatenate time and am/pm without space
    return formattedTime.replace(' ', '');
}
