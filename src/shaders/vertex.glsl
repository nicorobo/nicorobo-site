uniform float uTime;
varying vec2 vuv;
varying vec3 vposition;
void main () {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
    vuv=uv;
    vposition=modelPosition.xyz;
}