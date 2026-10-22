import { landscapeList, pxSrc } from "@/data/landscapes";
import { personal } from "@/data/personal";
import { GithubBrandIcon, LinkedinBrandIcon, MailIcon } from "@/icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <p>
            the paintings are photos from wikimedia commons, run through a small script that
            washes them out like watercolor and then draws them in 240 pixels. the script lives
            in the repo if you want your own.
          </p>
          <ul className="credits pixel">
            {landscapeList.map((l) => (
              <li key={l.key}>
                <img src={pxSrc(l)} alt="" loading="lazy" />
                <span>
                  {l.place} · <a href={l.credit.page} target="_blank" rel="noreferrer">{l.credit.artist}</a>,{" "}
                  {l.credit.licenseUrl ? (
                    <a href={l.credit.licenseUrl} target="_blank" rel="noreferrer">{l.credit.license}</a>
                  ) : (
                    l.credit.license
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p>made by manya, with claude code. type the konami code for a treat.</p>
          <div className="footer-social">
            <a href={personal.githubUrl} target="_blank" rel="noreferrer" className="bare">
              <GithubBrandIcon size={15} /> github
            </a>
            <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" className="bare">
              <LinkedinBrandIcon size={15} /> linkedin
            </a>
            <a href={`mailto:${personal.email}`} className="bare">
              <MailIcon size={15} /> email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
