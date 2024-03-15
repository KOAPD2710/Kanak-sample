function ResDtlRichTxt({ ...props }) {
    return (
        <div class="resource-dtl-richtxt">
            <div class="line line-ver"></div>
            <div class="txt txt-20 txt-med resource-dtl-richtxt-main">
                <figure>
                    <image src={props.image.src} ></image>
                    {/* <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption> */}
                </figure>
                <h2>In today's world, organic farming prioritizes soil health, biodiversity, and sustainability, going beyond the avoidance of synthetic pesticides and fertilizers.</h2>
                <h2>Soil Health and Sustainability</h2>
                <p>Organic farming practices prioritize soil health by avoiding synthetic pesticides and fertilizers. This approach promotes soil biodiversity, enhances water retention, and reduces erosion, contributing to long-term sustainability.</p>
                <h3>Biodiversity Conservation and Renewable Resource</h3>
                <ul>
                    <li>
                        Organic farming supports biodiversity conservation by protecting pollinators and encouraging crop rotation and cover cropping.
                    </li>
                    <li>
                        By avoiding synthetic chemicals, organic farmers promote renewable resource use and reduce reliance on harmful herbicides and insecticides.
                    </li>
                </ul>
                <h3>Health Benefits for Consumers</h3>
                <p>Consumers benefit from organic farming through access to produce free from synthetic pesticides and chemical residues. Studies also show that organic fruits and vegetables contain higher levels of nutrients and antioxidants, enhancing their nutritional value.</p>
                <h3>For elderly</h3>
                <p>Consumers benefit from organic farming through access to produce free from synthetic pesticides and chemical residues.</p>
                <h3>For children</h3>
                <p>Studies also show that organic fruits and vegetables contain higher levels of nutrients and antioxidants, enhancing their nutritional value.</p>
                <figure>
                    <image src={props.image.src} ></image>
                    <figcaption>Photo in David's farm  /  Taken by Alex Fox</figcaption>
                </figure>
                <h2>Environmental and Community Impact</h2>
                <p>Organic farming practices prioritize soil health by avoiding synthetic pesticides and fertilizers. This approach promotes soil biodiversity, enhances water retention, and reduces erosion, contributing to long-term sustainability.</p>
                <h3>Health Benefits for Consumers</h3>
                <p>Consumers benefit from organic farming through access to produce free from synthetic pesticides and chemical residues. Studies also show that organic fruits and vegetables contain higher levels of nutrients and antioxidants, enhancing their nutritional value.</p>
                <blockquote cite="http://www.worldwildlife.org/who/index.html">
                    <p>
                        “Organic farms contribute to biodiversity conservation, provide habitat for wildlife, and promote sustainable agriculture practices such as water conservation and soil management.”
                    </p>
                    <footer>Alex Fox</footer>
                </blockquote>
                <p>Supporting organic farming practices promotes environmental sustainability and community well-being. Organic farms contribute to biodiversity conservation provide habitat for wildlife, and promote sustainable agriculture practices such as water conservation and soil management.</p>
            </div>
        </div>
    )
}

export default ResDtlRichTxt