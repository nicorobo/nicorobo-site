uniform float uTime;
varying vec2 vuv;
varying vec3 vposition;
void main() {
    float stripes = pow(mod((vposition.y - uTime * 0.05) * 20., 1.), 3.);
    // float colorMult = abs(vposition.z);
    // float timed = (1. + sin(uTime)) / 2.;
    // colorMult *= timed;
    gl_FragColor = vec4(vuv, vposition.z  + 3. , stripes);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}