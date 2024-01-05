import '../ThankYouScreen.css'; // Make sure the CSS file is in the same directory.

const ThankYouScreen = () => {
  return (
    <div className="thank-you-container">
      <h1>That Wraps It Up!</h1>
      <p>Thank you for attempting our screening round.</p>
      <p>We will get back to you at the earliest.</p>
      <p>Feel free to explore our website: <a target='_blank' href="https://carparts.com">CarParts.com</a></p>
    </div>
  );
}

export default ThankYouScreen;
