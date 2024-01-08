const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {

    //get input params
    const bucket = core.getInput('bucket', {required: true});
    const bucketRegion = core.getInput('bucket-region', {required: true});
    const distFolder = core.getInput('dist-folder', {required: true});

    //upload via AWS cli that is preinstalled on runners using exec command
    const s3Uri =  `s3://${bucket}`;
    // s3 sync <local-folder> <remote-path>
    // access key is set in the env var of the cli that is used directly in the workflow

    exec.exec('aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}');

    // core.notice('Hello from my custom JS Action!'); # simple output in Workflow
    const websiteUrl = 'http://${bucket}.s3-website-${bucketRegion}.amazonaws.com';
    core.setOutput('website-url', websiteUrl)
    
    // github object has Otcokit client to communicate with github API using special query 
}

run();