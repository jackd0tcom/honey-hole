const EmailSignup = () => {
  return (
    <>
      <div id="hh-email-section">
        <div class="hh-email-wrapper">
          <div class="hh-email-container-one">
            <div class="hh-email-image"></div>
            <div class="hh-email-content">
              <h2>Get the Best Deals and Win Free Gear!</h2>
              <form
                method="post"
                class="af-form-wrapper"
                accept-charset="UTF-8"
                action="https://www.aweber.com/scripts/addlead.pl"
              >
                <div className="hidden">
                  <input
                    type="hidden"
                    name="meta_web_form_id"
                    value="894900673"
                  />
                  <input type="hidden" name="meta_split_id" value="" />
                  <input type="hidden" name="listname" value="awlist6324539" />
                  <input
                    type="hidden"
                    name="redirect"
                    value="https://www.aweber.com/thankyou-coi.htm?m=text"
                    id="redirect_8e911f903751383335eaae138e94c2b8"
                  />

                  <input
                    type="hidden"
                    name="meta_adtracking"
                    value="Honey_Hole_unstyled_form"
                  />
                  <input type="hidden" name="meta_message" value="1" />
                  <input type="hidden" name="meta_required" value="email" />

                  <input type="hidden" name="meta_tooltip" value="" />
                </div>
                <div id="af-form-894900673" class="af-form">
                  <div id="hh-input-wrapper" class="af-body af-standards">
                    <div class="af-element">
                      <div class="af-textWrap">
                        <input
                          placeholder="Email"
                          class="text"
                          id="awf_field-118013225"
                          type="email"
                          name="email"
                          value=""
                          tabindex="500"
                          onfocus=" if (this.value == '') { this.value = ''; }"
                          onblur="if (this.value == '') { this.value='';}"
                        />
                      </div>
                      <div class="af-clear"></div>
                    </div>
                    <div class="af-element buttonContainer">
                      <input
                        id="hh-email-submit"
                        name="submit"
                        class="submit"
                        type="submit"
                        value="Subscribe"
                        tabindex="501"
                      />
                      <div class="af-clear"></div>
                    </div>
                  </div>
                </div>
                <div className="hidden">
                  <img
                    src="https://forms.aweber.com/form/displays.htm?id=HJwsnAwMbOzM"
                    alt=""
                  />
                </div>
              </form>
              <p class="hh-email-disclaimer">
                We email once per week, sometimes more. Unsubscribe at any time.
              </p>
              <p class="hh-email-disclaimer">
                We respect your{" "}
                <a
                  id="hh-email-disclaimer-link"
                  href="https://www.aweber.com/privacy.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  email privacy
                </a>
              </p>
            </div>
          </div>
          <div class="hh-email-container-two-wrapper">
            <div class="hh-email-container-two">
              <h4>Get Sweet Outdoor Gear Deals in Your Inbox 🤑🏕️🔥</h4>
              <p>
                Receive outdoor stories, tips, and deal alerts. Plus, be entered
                into our weekly gear giveaway when you sign up for{" "}
                <span className="italic">The Honey Hole</span> email newsletter!
              </p>
              <p>
                Join thousands of outdoor enthusiasts who love saving money and
                discovering the best gear.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailSignup;
