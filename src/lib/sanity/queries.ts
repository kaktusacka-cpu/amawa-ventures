import groq from "groq";

export const homePageQuery = groq`
*[_type == "homePage" && slug.current == "home"][0]{
  "nav": {
    "about": coalesce(nav.about[$locale], nav.about.en),
    "experiences": coalesce(nav.experiences[$locale], nav.experiences.en),
    "whatWeDo": coalesce(nav.whatWeDo[$locale], nav.whatWeDo.en),
    "collaborate": coalesce(nav.collaborate[$locale], nav.collaborate.en),
    "getInTouch": coalesce(nav.getInTouch[$locale], nav.getInTouch.en)
  },
  "hero": {
    "eyebrow": coalesce(hero.eyebrow[$locale], hero.eyebrow.en),
    "title": coalesce(hero.title[$locale], hero.title.en),
    "lead": coalesce(hero.lead[$locale], hero.lead.en),
    "thinkWord": coalesce(hero.thinkWord[$locale], hero.thinkWord.en),
    "growWord": coalesce(hero.growWord[$locale], hero.growWord.en),
    "subLead": coalesce(hero.subLead[$locale], hero.subLead.en),
    "primaryCta": coalesce(hero.primaryCta[$locale], hero.primaryCta.en),
    "secondaryCta": coalesce(hero.secondaryCta[$locale], hero.secondaryCta.en),
    "videoPlaceholder": coalesce(hero.videoPlaceholder[$locale], hero.videoPlaceholder.en)
  },
  "about": {
    "title": coalesce(about.title[$locale], about.title.en),
    "description": coalesce(about.description[$locale], about.description.en)
  },
  "paths": {
    "title": coalesce(paths.title[$locale], paths.title.en),
    "cards": paths.cards[]{
      "title": coalesce(title[$locale], title.en),
      "description": coalesce(description[$locale], description.en),
      "cta": coalesce(cta[$locale], cta.en)
    }
  },
  "coreWork": {
    "eyebrow": coalesce(coreWork.eyebrow[$locale], coreWork.eyebrow.en),
    "title": coalesce(coreWork.title[$locale], coreWork.title.en),
    "cards": coreWork.cards[]{
      "title": coalesce(title[$locale], title.en),
      "description": coalesce(description[$locale], description.en),
      "cta": coalesce(cta[$locale], cta.en)
    }
  },
  "approach": {
    "eyebrow": coalesce(approach.eyebrow[$locale], approach.eyebrow.en),
    "title": coalesce(approach.title[$locale], approach.title.en),
    "description": coalesce(approach.description[$locale], approach.description.en)
  },
  "impact": {
    "eyebrow": coalesce(impact.eyebrow[$locale], impact.eyebrow.en),
    "title": coalesce(impact.title[$locale], impact.title.en),
    "description": coalesce(impact.description[$locale], impact.description.en),
    "metrics": impact.metrics[]{
      value,
      "label": coalesce(label[$locale], label.en)
    }
  },
  "testimonials": {
    "eyebrow": coalesce(testimonials.eyebrow[$locale], testimonials.eyebrow.en),
    "title": coalesce(testimonials.title[$locale], testimonials.title.en),
    "quote": coalesce(testimonials.quote[$locale], testimonials.quote.en),
    "author": coalesce(testimonials.author[$locale], testimonials.author.en),
    "role": coalesce(testimonials.role[$locale], testimonials.role.en)
  },
  "contact": {
    "eyebrow": coalesce(contact.eyebrow[$locale], contact.eyebrow.en),
    "title": coalesce(contact.title[$locale], contact.title.en),
    "formName": coalesce(contact.formName[$locale], contact.formName.en),
    "formEmail": coalesce(contact.formEmail[$locale], contact.formEmail.en),
    "formMessage": coalesce(contact.formMessage[$locale], contact.formMessage.en),
    "formSubmit": coalesce(contact.formSubmit[$locale], contact.formSubmit.en),
    "callTitle": coalesce(contact.callTitle[$locale], contact.callTitle.en),
    "callDescription": coalesce(contact.callDescription[$locale], contact.callDescription.en),
    "callCta": coalesce(contact.callCta[$locale], contact.callCta.en),
    "connectTitle": coalesce(contact.connectTitle[$locale], contact.connectTitle.en),
    "connectItems": contact.connectItems[][$locale]
  },
  "footer": {
    "brand": coalesce(footer.brand[$locale], footer.brand.en),
    "copyright": coalesce(footer.copyright[$locale], footer.copyright.en)
  }
}
`;

export const experiencesPageQuery = groq`
*[_type == "experiencesPage" && slug.current == "experiences"][0]{
  "hero": {
    "title": coalesce(hero.title[$locale], hero.title.en),
    "tagline": coalesce(hero.tagline[$locale], hero.tagline.en),
    "description": coalesce(hero.description[$locale], hero.description.en),
    "ctaLabel": coalesce(hero.ctaLabel[$locale], hero.ctaLabel.en)
  },
  "statusLabels": {
    "upcoming": coalesce(statusLabels.upcoming[$locale], statusLabels.upcoming.en),
    "current": coalesce(statusLabels.current[$locale], statusLabels.current.en)
  },
  "categories": categories[]{
    "label": coalesce(label[$locale], label.en),
    "title": coalesce(title[$locale], title.en),
    "description": coalesce(description[$locale], description.en),
    "experiences": experiences[]{
      "title": coalesce(title[$locale], title.en),
      "description": coalesce(description[$locale], description.en),
      "image": image.asset->url,
      "imageAlt": coalesce(imageAlt[$locale], imageAlt.en),
      isUpcoming
    }
  }
}
`;

export const whatWeDoPageQuery = groq`
*[_type == "whatWeDoPage" && slug.current == "what-we-do"][0]{
  "hero": {
    "title": coalesce(hero.title[$locale], hero.title.en),
    "leadText": coalesce(hero.leadText[$locale], hero.leadText.en),
    "secondaryText": coalesce(hero.secondaryText[$locale], hero.secondaryText.en),
    "ctaLabel": coalesce(hero.ctaLabel[$locale], hero.ctaLabel.en)
  },
  "areas": areas[]{
    "title": coalesce(title[$locale], title.en),
    "descriptions": descriptions[]{
      "text": coalesce(@[$locale], @.en)
    }
  }
}
`;
