const path = require("path");
const fs = require("fs");
const core = require("@actions/core");
const tc = require("@actions/tool-cache");

const cachedFileName = "buf";
const executableFileName = "buf";

(async () => {
	try {
		const version = core.getInput("version");
		const platform = ({
			"linux": "Linux",
			"darwin": "Darwin",
		})[process.platform];
		const arch = "x86_64";
	
		if (!platform) {
			core.setFailed(`Unsupported platform '${process.platform}'`)
			return;
		}
	
		let toolPath = await tc.find(executableFileName, version, arch);

		if (!toolPath) {
			toolPath = await download(version, platform, arch);
		}

		fs.chmodSync(path.join(toolPath, executableFileName), '777');
		core.addPath(toolPath);
	} catch (error) {
		core.setFailed(error.message);
	}
})();
	
async function download(version, platform, arch) {
	const url = `https://github.com/bufbuild/buf/releases/download/v${version}/buf-${platform}-${arch}`;
	const buf = await tc.downloadTool(url);
	
	return tc.cacheFile(buf, cachedFileName, executableFileName, version, arch);
}
