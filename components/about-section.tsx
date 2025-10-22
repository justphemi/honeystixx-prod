export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-gradient-to-br from-pink-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">
              Empowering Women's <span className="text-primary">Health</span>
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              At Honeystixx, we believe every woman deserves access to comprehensive, accurate, and private health
              testing. Our mission is to empower you with the knowledge you need to make informed decisions about your
              health and wellness.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-pink-100">
              <h3 className="font-serif text-2xl font-bold mb-4">Our Story</h3>
              <p className="text-muted-foreground leading-relaxed">
                Founded by women, for women, Honeystixx was created to address the gap in accessible, private health
                testing. We understand the unique challenges women face in healthcare and have designed our products to
                be both comprehensive and easy to use.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-pink-100">
              <h3 className="font-serif text-2xl font-bold mb-4">Our Promise</h3>
              <p className="text-muted-foreground leading-relaxed">
                We're committed to providing accurate, reliable results with complete privacy and discretion. Every kit
                is manufactured to the highest standards and backed by our team of healthcare professionals who are here
                to support you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
