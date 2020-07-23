import React from 'react'

const Contact = (props) => (
    <section id="contact">
        <div className="inner">
            <section>
                <form name="contact" method="post" action="/success" data-netlify="true" data-netlify-honeypot="bot-field">

                    <input type="hidden" name="bot-field" />

                    <div className="field half first">
                        <label id="name-label" htmlFor="name">
                        Name:
                        <input type="text" name="name" id="name" required/>
                        </label>
                    </div>
                    <div className="field half">
                        <label htmlFor="email">
                        Email:
                        <input type="text" name="email" id="email" required/>
                        </label>
                    </div>
                    <div className="field">
                        <label htmlFor="message">
                        Message:
                        <textarea name="message" id="message" rows="6" required></textarea>
                        </label>
                    </div>
                    <hr></hr>
                    <div className="block-text">
                        <ul className="actions.block-cta">
                            <input type="submit" value="Send Request" className="button.secondary" />
                        </ul>
                    </div>
                </form>
            </section>
        </div>
    </section>
)

export default Contact